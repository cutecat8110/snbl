/* Focused regression tests for the existing Vue Options API components. */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' })
for (const key of ['window', 'document', 'navigator', 'Node', 'Element', 'HTMLElement', 'SVGElement', 'Event', 'CustomEvent', 'ShadowRoot', 'sessionStorage', 'localStorage', 'getComputedStyle']) {
  global[key] = key === 'getComputedStyle' ? dom.window.getComputedStyle.bind(dom.window) : dom.window[key]
}
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
window.scrollTo = () => {}
const Vue = require('vue')
const { mount, flushPromises } = require('@vue/test-utils')
const { parse } = require('@vue/compiler-sfc')
const { compile } = require('@vue/compiler-dom')
const babel = require('@babel/core')
const root = path.resolve(__dirname, '..')
const cache = new Map()
const stub = { render: () => null }
function execute(source, filename) {
  const module = { exports: {} }
  const code = babel.transformSync(source, {
    filename, configFile: false, babelrc: false,
    plugins: ['@babel/plugin-transform-modules-commonjs']
  }).code
  function localRequire(id) {
    if (id.endsWith('.vue')) return stub
    if (/\.(css|scss)$/.test(id)) return {}
    if (id === 'swiper/vue') return { Swiper: stub, SwiperSlide: stub }
    if (id.startsWith('@/')) return load(path.join(root, 'src', id.slice(2)))
    if (id.startsWith('.')) return load(path.resolve(path.dirname(filename), id))
    return require(id)
  }
  new Function('require', 'module', 'exports', 'process', code)(localRequire, module, module.exports, process)
  return module.exports
}
function load(filename) {
  const file = path.extname(filename) ? filename : `${filename}.js`
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'))
  if (!cache.has(file)) cache.set(file, execute(fs.readFileSync(file, 'utf8'), file))
  return cache.get(file)
}
function component(relative) {
  const file = path.join(root, 'src', relative)
  const { descriptor } = parse(fs.readFileSync(file, 'utf8'))
  const result = execute(descriptor.script.content, file).default
  result.render = new Function('Vue', compile(descriptor.template.content, { mode: 'function', prefixIdentifiers: true }).code)(Vue)
  return result
}
const emitter = load(path.join(root, 'src/methods/eventBus')).default
const globals = {
  provide: { emitter },
  mocks: { $route: { params: {}, path: '/' }, $router: { push: async () => {}, replace: async () => {} },
    $swal: async () => ({}), $filters: { currency: (value) => String(value ?? '') },
    $imageAttributes: load(path.join(root, 'src/methods/images')).default },
  stubs: { 'router-link': { template: '<a><slot /></a>' }, 'router-view': true, Loading: true }
}
const product = { id: 'p1', title: 'Test product', price: 100, origin_price: 100, colors: [{name: 'Red', colorChart: '#f00'}], clothSize: ['S', 'M'] }
function vmFor(options, values = {}) {
  const vm = { ...options.data(), ...values }
  for (const [key, fn] of Object.entries(options.methods || {})) vm[key] = fn.bind(vm)
  return vm
}
const tests = []
function test(name, fn) { tests.push([name, fn]) }

test('favorite control exposes its product and pressed state without submitting forms', async () => {
  const w = mount(component('components/common/FavoriteButton.vue'), { props: { name: product.title, active: false } })
  const button = w.get('button')
  assert.equal(button.attributes('type'), 'button')
  assert.equal(button.attributes('aria-label'), `收藏${product.title}`)
  assert.equal(button.attributes('aria-pressed'), 'false')
  await button.trigger('click')
  assert.equal(w.emitted('toggle').length, 1)
  await w.setProps({ active: true })
  assert.equal(button.attributes('aria-pressed'), 'true')
  assert.equal(button.attributes('aria-label'), `取消收藏${product.title}`)
  w.unmount()
})

test('product pagination prevents boundary navigation and identifies the current page', async () => {
  const w = mount(component('components/front/Pagination.vue'), { props: { pages: { current_page: 1, total_pages: 3 } } })
  assert.equal(w.get('[aria-current="page"]').text(), '1')
  assert.equal(w.get('[aria-label="上一頁"]').attributes('disabled'), '')
  await w.get('[aria-label="上一頁"]').trigger('click')
  assert.equal(w.emitted('emit-page'), undefined)
  await w.get('[aria-label="下一頁"]').trigger('click')
  assert.deepEqual(w.emitted('emit-page'), [[2]])
  await w.setProps({ pages: { current_page: 3, total_pages: 3 } })
  assert.equal(w.get('[aria-label="下一頁"]').attributes('disabled'), '')
  await w.setProps({ pages: {} })
  assert.equal(w.get('[aria-label="上一頁"]').attributes('disabled'), '')
  assert.equal(w.get('[aria-label="下一頁"]').attributes('disabled'), '')
  w.unmount()
})

test('product quantity rejects zero/blank/over-limit and click supports keyboard activation', async () => {
  const w = mount(component('components/common/ProductForm.vue'), { props: { product }, global: globals })
  const input = w.get('input[aria-label="商品數量"]')
  await input.setValue('0'); await input.trigger('blur'); assert.equal(w.vm.qty, 1)
  await input.setValue(''); await input.trigger('blur'); assert.equal(w.vm.qty, 1)
  await input.setValue('999'); assert.equal(w.vm.qty, 99)
  await input.setValue('2'); assert.equal(w.vm.qty, 2)
  await w.findAll('.qty button')[1].trigger('click'); assert.equal(w.vm.qty, 3)
  w.unmount()
})
test('selected size is shown and changes reset when navigating between products', async () => {
  const w = mount(component('components/common/ProductForm.vue'), { props: { product }, global: globals })
  await w.get('input[name="product-size"][value="M"]').setValue()
  assert.match(w.get('.size-container .form-label').text(), /M/)
  await w.get('input[name="product-color"]').setValue()
  await w.setProps({ product: { ...product, id: 'p2', clothSize: ['F'] } })
  assert.deepEqual({ ...w.vm.selected }, { color: '', size: '' }); assert.equal(w.vm.qty, 1)
  w.unmount()
})
test('desktop and mobile option IDs are unique; mobile zero is normalized', async () => {
  const desktop = mount(component('components/common/ProductForm.vue'), { props: { product }, global: globals })
  const mobile = mount(component('components/common/ProductFormModal.vue'), { props: { product, tempSelected: {color:'',size:''}, tempQty:1 }, global: globals })
  const ids = [...desktop.findAll('[id]'), ...mobile.findAll('[id]')].map(e => e.attributes('id'))
  assert.equal(new Set(ids).size, ids.length)
  await mobile.get('input[aria-label="商品數量"]').setValue('0')
  assert.equal(mobile.vm.qty, 1)
  desktop.unmount(); mobile.unmount()
})
test('cart quantity input handles zero and empty values without throwing', async () => {
  const w = mount(component('components/common/CartList.vue'), { global: globals })
  const item = { id: 'c1', product: {...product}, selected: [{color:'Red',size:'S',qty:2}] }
  emitter.emit('upDateCart', [{carts:[item]}, [item], [item]])
  await Vue.nextTick()
  await w.findAll('input')[0].setValue('0'); assert.equal(w.vm.showCart[0].selected[0].qty, 1)
  await w.findAll('input')[0].setValue(''); await w.findAll('input')[0].trigger('blur')
  assert.equal(w.vm.showCart[0].selected[0].qty, 1)
  w.unmount()
})
test('component subscriptions are released when navigating away', () => {
  let calls = 0
  const w = mount({ created(){emitter.on('qa-event', () => calls++)}, render:()=>null })
  emitter.emit('qa-event'); assert.equal(calls,1)
  w.unmount(); emitter.emit('qa-event'); assert.equal(calls,1)
  assert.equal(emitter.all.get('qa-event').length,0)
})
test('home accepts catalogues with 0, 1, 29 or 30 products and resets repeat results', async () => {
  const home = component('views/front/Home.vue')
  for (const count of [0,1,29,30]) {
    const products = Array.from({length:count}, (_,id)=>({id}))
    const vm=vmFor(home, { $http:{get:async()=>({data:{success:true,products}})},$swal:async()=>({}) })
    await vm.getAll(); await vm.getAll()
    assert.equal(vm.randomProducts.length,count)
    assert.equal(new Set(vm.randomProducts.map(p=>p.id)).size,count)
  }
})
test('shipping fee responds to new totals without reselecting delivery', async () => {
  const w=mount(component('components/common/CartPayMent.vue'), {props:{qty:1}, global:globals})
  w.vm.payment.conveyance='新竹物流'; await Vue.nextTick()
  w.vm.payment.method='ATM 轉帳'; await Vue.nextTick()
  emitter.emit('upDateCart',[{total:1000,final_total:1000}]); await Vue.nextTick()
  assert.equal(w.vm.conveyanceCost,70)
  emitter.emit('upDateCart',[{total:2100,final_total:2100}]); await Vue.nextTick()
  assert.equal(w.vm.conveyanceCost,0); assert.equal(w.vm.orderTotal,2100)
  w.vm.payment.country='US'; await Vue.nextTick()
  assert.equal(w.vm.conveyanceCost,'未包含'); assert.equal(w.vm.orderTotal,2100)
  w.unmount()
})
test('order image remains safe while catalogue is empty or still loading', () => {
  const order = component('views/front/CartCompleted.vue')
  assert.equal(order.computed.scenery.call({productsAll:[]}), '')
})
function cartApi() {
  const state={items:[],writes:[]}
  const clone=x=>JSON.parse(JSON.stringify(x))
  return { state,
    get:async()=>({data:{success:true,data:{carts:clone(state.items),total:100,final_total:100}}}),
    post:async(url,{data})=>{
      state.writes.push(clone(data))
      let item=state.items.find(x=>x.product_id===data.product_id)
      if(!item){item={id:'c1',product_id:data.product_id,product};state.items.push(item)}
      Object.assign(item,{selected:clone(data.selected),qty:(item.qty||0)+data.qty})
      return {data:{success:true}}
    },
    put:async(url,{data})=>{state.writes.push(clone(data));Object.assign(state.items[0],clone(data));return {data:{success:true}}},
    delete:async()=>{state.items=[];return {data:{success:true}}}
  }
}
test('rapid adds serialize numeric amounts and keep similarly named variants separate', async () => {
  const api=cartApi()
  const vm=vmFor(component('components/front/FrontHeader.vue'),{$http:api,emitter,$swal:async()=>({})})
  await Promise.all([
    vm.addToCart({id:'p1',selected:{color:'Dark Red',size:'XS'},qty:'2'}),
    vm.addToCart({id:'p1',selected:{color:'Red',size:'S'},qty:'3'}),
    vm.addToCart({id:'p1',selected:{color:'Red',size:'S'},qty:'2'})
  ])
  assert.equal(api.state.items[0].qty,7)
  assert.deepEqual(api.state.items[0].selected,[{color:'Dark Red',size:'XS',qty:2},{color:'Red',size:'S',qty:5}])
  assert.ok(api.state.writes.every(x=>typeof x.qty==='number'))
  await vm.upDate(1,'c1',{color:'Red',size:'S',qty:'4'})
  assert.equal(api.state.items[0].qty,6)
  await vm.delCart('c1',{color:'Red',size:'S',qty:4})
  assert.equal(api.state.items[0].qty,2);assert.equal(api.state.items[0].selected[0].size,'XS')
})
test('API failures clear loading and preserve failed mutations', async () => {
  const run=load(path.join(root,'src/methods/request')).default
  const states=[]; const handler=value=>states.push(value);emitter.on('isLoading',handler)
  let alerts=0,received=false
  const vm={$swal:async()=>{alerts++;return {}}}
  await run(vm,async()=>{throw Error('offline')},()=>{received=true})
  assert.equal(received,false);assert.equal(states.at(-1),false);assert.equal(alerts,1)
  await flushPromises()
  await run(vm,async()=>({data:{success:false,message:'not found'}}),()=>{received=true})
  assert.equal(received,false);assert.equal(states.at(-1),false)
  emitter.off('isLoading',handler)
})
test('late cart reads cannot replace a newer mutation refresh', async () => {
  const responses = []
  const vm = vmFor(component('components/front/FrontHeader.vue'), {
    $http: { get: () => new Promise(resolve => responses.push(resolve)) },
    emitter, $swal: async () => ({})
  })
  const response = qty => ({ data: { success: true, data: {
    carts: [{ id: 'c1', product_id: 'p1', product, qty, selected: [{ color: 'Red', size: 'S', qty }] }],
    total: qty * 100, final_total: qty * 100
  } } })
  const old = vm.getCart()
  const fresh = vm.getCart(true)
  responses[1](response(3)); await fresh
  responses[0](response(1)); await old
  assert.equal(vm.qty, 3)
  assert.equal(vm.cart.total, 300)
})
test('simultaneous cart consumers share a pending read and can retry after it fails', async () => {
  let calls = 0
  const rejections = []
  const vm = vmFor(component('components/front/FrontHeader.vue'), {
    $http: { get: () => { calls++; return new Promise((resolve, fail) => { rejections.push(fail) }) } },
    emitter, $swal: async () => ({})
  })
  const first = vm.getCart(), second = vm.getCart()
  rejections.forEach(reject => reject(Error('offline')))
  await Promise.all([first, second]); await flushPromises()
  assert.equal(calls, 1)
  vm.$http.get = async () => ({ data: { success: true, data: { carts: [], total: 0, final_total: 0 } } })
  assert.equal(await vm.getCart(), true)
})
test('checkout mounted after the cart count receives items and totals from a completed read', async () => {
  const api = cartApi()
  api.state.items = [{ id: 'c1', product_id: 'p1', product, qty: 2, selected: [{ color: 'Red', size: 'S', qty: 2 }] }]
  const header = vmFor(component('components/front/FrontHeader.vue'), { $http: api, emitter, $swal: async () => ({}) })
  const refresh = () => header.getCart()
  emitter.on('emitToCart', refresh)
  const checkout = component('views/front/CartCheckOut.vue')
  checkout.components = {
    CartList: component('components/common/CartList.vue'),
    CartPayMent: component('components/common/CartPayMent.vue')
  }
  const host = mount({
    data: () => ({ qty: 0 }),
    created() { emitter.on('upDateQty', qty => { this.qty = qty }) },
    render() { return this.qty ? Vue.h(checkout) : null }
  }, { global: globals })
  try {
    await header.getCart()
    await flushPromises()
    assert.equal(host.get('h1').text(), '購物清單 (2)')
    assert.equal(host.findComponent(checkout.components.CartList).vm.showCart.length, 1)
    assert.equal(host.findComponent(checkout.components.CartPayMent).vm.cart.final_total, 100)
  } finally {
    host.unmount()
    emitter.off('emitToCart', refresh)
  }
})
test('loading remains active until every concurrent request settles', async () => {
  const run=load(path.join(root,'src/methods/request')).default
  const states=[]; const handler=value=>states.push(value);emitter.on('isLoading',handler)
  let finishFirst,finishSecond
  const first=run({},()=>new Promise(resolve=>{finishFirst=resolve}),()=>{})
  const second=run({},()=>new Promise(resolve=>{finishSecond=resolve}),()=>{})
  finishFirst({data:{success:true}});await first;assert.equal(states.at(-1),true)
  finishSecond({data:{success:true}});await second;assert.equal(states.at(-1),false)
  emitter.off('isLoading',handler)
})
test('admin waits for successful auth and redirects missing/rejected sessions', async () => {
  const admin=component('views/back/Dashboard.vue')
  let calls=0, destination=''
  const vm=vmFor(admin,{$http:{defaults:{headers:{common:{}}},post:async()=>{calls++;throw Error('expired')}},$router:{replace:x=>{destination=x}},$swal:async()=>{}})
  await admin.created.call(vm)
  assert.equal(calls,0);assert.equal(destination,'/login');assert.equal(vm.authenticated,false)
  document.cookie='snblAuthToken=test-only'
  destination='';await admin.created.call(vm)
  assert.equal(calls,1);assert.equal(destination,'/login');assert.equal(vm.authenticated,false)
  assert.ok(!document.cookie.includes('snblAuthToken='))
  document.cookie='snblAuthToken=test-only'
  vm.$http.post=async()=>({data:{success:true}})
  await admin.created.call(vm);assert.equal(vm.authenticated,true)
  document.cookie='snblAuthToken=; Max-Age=0'
})
test('admin ignores legacy tokens from other projects on the same host', async () => {
  const auth=load(path.join(root,'src/methods/authSession'))
  document.cookie='hexToken=stale-other-project; path=/'
  document.cookie='otherSession=keep; path=/'
  auth.saveSession('current-snbl-token',Date.now()+60000)
  assert.equal(auth.readSession(),'current-snbl-token')
  let checked=''
  const http={defaults:{headers:{common:{}}},post:async()=>{checked=http.defaults.headers.common.Authorization;return{data:{success:true}}}}
  const admin=component('views/back/Dashboard.vue')
  const vm=vmFor(admin,{$http:http,$router:{replace:()=>{}},$swal:async()=>{}})
  await admin.created.call(vm)
  assert.equal(checked,'current-snbl-token');assert.equal(vm.authenticated,true)
  auth.clearSession(http)
  assert.equal(auth.readSession(),'');assert.ok(document.cookie.includes('otherSession=keep'))
  document.cookie='hexToken=stale-other-project; path=/'
  assert.equal(auth.readSession(),'')
  document.cookie='hexToken=; Max-Age=0; path=/'
  document.cookie='otherSession=; Max-Age=0; path=/'
})
test('project-scoped sign-out leaves another application root cookie intact', () => {
  const previousBase=process.env.BASE_URL
  process.env.BASE_URL='/snbl/'
  dom.reconfigure({url:'http://localhost/snbl/'})
  const filename=path.join(root,'src/methods/authSession.js')
  const auth=execute(fs.readFileSync(filename,'utf8'),filename)
  try {
    document.cookie='hexToken=other-project; path=/'
    document.cookie='hexToken=old-snbl; path=/snbl/'
    auth.saveSession('current-snbl',Date.now()+60000)
    assert.equal(auth.readSession(),'current-snbl')
    auth.clearSession({defaults:{headers:{common:{Authorization:'current-snbl'}}}})
    assert.equal(auth.readSession(),'')
    assert.ok(document.cookie.includes('hexToken=other-project'))
    assert.ok(!document.cookie.includes('old-snbl'))
  } finally {
    document.cookie='hexToken=; Max-Age=0; path=/'
    dom.reconfigure({url:'http://localhost/'})
    if(previousBase===undefined)delete process.env.BASE_URL
    else process.env.BASE_URL=previousBase
  }
})
test('login remains usable after background or sign-in network failures', async () => {
  const login=component('views/back/Login.vue')
  const vm=vmFor(login,{$http:{get:async()=>{throw Error('offline')},post:async()=>{throw Error('offline')}},$swal:async()=>{}})
  await vm.render();assert.equal(vm.isLoading,false)
  vm.user={username:'qa@example.test',password:'test-only'}
  await vm.login();assert.equal(vm.isLoading,false);assert.equal(vm.user.username,'qa@example.test');assert.equal(vm.user.password,'')
})
test('international checkout total excludes unknown shipping instead of concatenating text',()=>{
  const checkout=component('views/front/CartAdd.vue')
  assert.equal(checkout.computed.orderTotal.call({cart:{final_total:1200},conveyanceCost:'未包含'}),1200)
})
test('checkout delivery survives refresh and shipping uses the refreshed cart total',()=>{
  const payment=load(path.join(root,'src/methods/checkoutPayment'))
  const selected={country:'TW',conveyance:'新竹物流',method:'ATM 轉帳'}
  payment.savePayment(selected)
  const checkout=component('views/front/CartAdd.vue')
  const vm=vmFor(checkout,{cart:{final_total:1890}})
  assert.deepEqual(vm.form.message.payment,selected)
  assert.equal(checkout.computed.conveyanceCost.call(vm),70)
  vm.cart.final_total=2100;assert.equal(checkout.computed.conveyanceCost.call(vm),0)
  sessionStorage.clear()
})
test('leaving a product page does not request an undefined product', async()=>{
  let requests=0
  const vm=vmFor(component('views/front/Product.vue'),{$route:{path:'/cart',params:{}},$http:{get:()=>{requests++}}})
  await vm.getProduct();assert.equal(requests,0)
})
test('checkout subscribes before refreshing a fast API cart',()=>{
  const checkout=component('views/front/CartAdd.vue')
  const handlers={}
  const localEmitter={on:(event,handler)=>{handlers[event]=handler},emit:event=>{
    if(event==='emitToCart'){
      handlers.upDateCart([{final_total:2100},[],[]]);handlers.upDateQty(3)
    }
  }}
  const vm=vmFor(checkout,{emitter:localEmitter})
  checkout.created.call(vm);assert.equal(vm.qty,3);assert.equal(vm.cart.final_total,2100)
})
test('background image does not block login or release an active sign-in lock', async()=>{
  const login=component('views/back/Login.vue')
  let finishImage
  const vm=vmFor(login,{$http:{get:()=>new Promise(resolve=>{finishImage=resolve})}})
  const pending=vm.render();assert.equal(vm.isLoading,false)
  vm.isLoading=true;finishImage({data:{article:{articleImagesUrl:[]}}});await pending
  assert.equal(vm.isLoading,true)
})
test('logout clears cookie and Authorization even when the server is unreachable',async()=>{
  const auth=load(path.join(root,'src/methods/authSession'))
  for(const fail of [false,true]){
    auth.saveSession('test-only',Date.now()+60000)
    assert.ok(document.cookie.includes('snblAuthToken='))
    let destination=''
    const vm=vmFor(component('components/back/BackHeader.vue'),{$http:{defaults:{headers:{common:{Authorization:'test-only'}}},post:async()=>{if(fail)throw Error('offline');return{data:{success:true}}}},$swal:async()=>{},$router:{replace:x=>{destination=x}}})
    await vm.logout()
    assert.ok(!document.cookie.includes('snblAuthToken='));assert.equal(vm.$http.defaults.headers.common.Authorization,undefined);assert.equal(destination,'/')
  }
})
test('successful login stores an expiring session and navigates to products',async()=>{
  let destination='',writes=0
  const vm=vmFor(component('views/back/Login.vue'),{$http:{post:async()=>{writes++;return{data:{success:true,token:'test-only',expired:Date.now()+60000}}}},$swal:async()=>{},$router:{push:x=>{destination=x}}})
  await Promise.all([vm.login(),vm.login()]);assert.equal(writes,1);assert.equal(destination,'/admin/products');assert.ok(document.cookie.includes('snblAuthToken=test-only'))
  document.cookie='snblAuthToken=; Max-Age=0; path=/'
})
test('lazy images keep exact dimensions, original URLs and handle empty/new images',()=>{
  const images=load(path.join(root,'src/methods/images'))
  const src='https://storage.googleapis.com/vue-course-api.appspot.com/haohao/1632030871435.jpg'
  const attrs=images.default(src)
  assert.equal(attrs.src,src);assert.ok(attrs.width>0 && attrs.height>0)
  assert.equal(attrs.loading,'lazy');assert.equal(attrs.decoding,'async')
  assert.equal(images.default(src,'eager').loading,'eager')
  assert.equal(images.default('').src,undefined)
  assert.equal(images.default([]).src,undefined)
  assert.deepEqual(images.default('https://example.test/new.jpg'),{src:'https://example.test/new.jpg',loading:'lazy',decoding:'async'})
  assert.deepEqual(images.imageSources(['',null,' /a.jpg ','/b.jpg','/a.jpg']),['/a.jpg','/b.jpg'])
})
test('product galleries show initial props, ignore blank images and follow a new product',async()=>{
  for(const file of ['components/common/ProductSwiper.vue','components/back/ProductSwiper.vue']){
    const w=mount(component(file),{props:{tempProduct:{id:'p1',imageUrl:'/cover.jpg',imagesUrl:['','/detail.jpg']}},global:globals})
    assert.deepEqual(w.vm.slides,['/cover.jpg','/detail.jpg'])
    await w.setProps({tempProduct:{id:'p2',imageUrl:'/next.jpg'}})
    assert.deepEqual(w.vm.slides,['/next.jpg'])
    w.unmount()
  }
})
test('home carousel does not render undefined banners while its article is pending',async()=>{
  const w=mount(component('components/front/HomeSwiper.vue'),{props:{image:[]},global:globals})
  assert.deepEqual(w.vm.slides,[]);assert.equal(w.find('.mySwiperHome').exists(),false)
  await w.setProps({image:['','/banner.jpg']});assert.deepEqual(w.vm.slides,['/banner.jpg'])
  w.unmount()
})
test('article images render as individual URLs and login uses a single valid background',async()=>{
  const response={data:{success:true,article:{articleImagesUrl:['/a.jpg','','/b.jpg']}}}
  for(const file of ['Story','TryFree','Vip']){
    const w=mount(component(`views/front/${file}.vue`),{global:{...globals,mocks:{...globals.mocks,$http:{get:async()=>response}}}})
    await flushPromises()
    assert.deepEqual(w.findAll('img').map(i=>i.attributes('src')),['/a.jpg','/b.jpg'])
    assert.equal(w.findAll('img')[0].attributes('loading'),'eager')
    assert.equal(w.findAll('img')[1].attributes('loading'),'lazy')
    w.unmount()
  }
  const vm=vmFor(component('views/back/Login.vue'),{$http:{get:async()=>response}})
  await vm.render();assert.equal(vm.loginImage,'/a.jpg')
})
test('product section navigation is safe before optional image content is available',()=>{
  const vm=vmFor(component('views/front/Product.vue'),{$refs:{}})
  assert.doesNotThrow(()=>vm.subNav('infolImageUrl'))
  let position
  const original=window.scrollTo
  window.scrollTo=(x,y)=>{position=y}
  vm.$refs.infolImageUrl={getBoundingClientRect:()=>({top:500})}
  vm.subNav('infolImageUrl');assert.equal(position,444)
  window.scrollTo=original
})
test('simultaneous catalogue consumers share one request, then revalidate after success or failure',async()=>{
  const readCatalogue=load(path.join(root,'src/methods/catalogue')).default
  let calls=0,finish,options
  const http={get:(url,config)=>{calls++;options=config;return new Promise(resolve=>{finish=resolve})}}
  const first=readCatalogue(http),second=readCatalogue(http)
  assert.equal(calls,1);assert.equal(first,second);assert.equal(options.timeout,15000)
  finish({data:{products:[product]}});await first
  const next=readCatalogue(http);assert.equal(calls,2);finish({data:{products:[]}});await next
  http.get=async()=>{calls++;throw Error('offline')}
  await assert.rejects(readCatalogue(http),/offline/)
  await assert.rejects(readCatalogue(http),/offline/);assert.equal(calls,4)
})
test('checkout arrows follow accepted collapse transitions rather than rapid clicks',async()=>{
  const {Collapse}=require('bootstrap')
  const checkout=component('views/front/CartAdd.vue')
  const panel=document.createElement('div');panel.className='collapse';document.body.append(panel)
  const vm=vmFor(checkout,{$refs:{orderInformation:panel}})
  checkout.mounted.call(vm)
  const collapse=new Collapse(panel,{toggle:false})
  collapse.show();collapse.hide()
  assert.equal(vm.orderInfor,true)
  panel.dispatchEvent(new window.Event('transitionend'));await flushPromises()
  assert.ok(panel.classList.contains('show'))
  collapse.hide();assert.equal(vm.orderInfor,false)
  panel.dispatchEvent(new window.Event('transitionend'));await flushPromises()
  assert.ok(!panel.classList.contains('show'))
  checkout.beforeUnmount.call(vm);collapse.dispose();panel.remove()
})
test('admin navigation closes on a same-page link, including an opening transition',async()=>{
  const {Collapse}=require('bootstrap')
  const w=mount(component('components/back/BackHeader.vue'),{attachTo:document.body,global:globals})
  const panel=w.get('.navbar-collapse').element
  const collapse=Collapse.getOrCreateInstance(panel,{toggle:false})
  collapse.show()
  await w.findAll('.navbar-nav a')[0].trigger('click')
  panel.dispatchEvent(new window.Event('transitionend'));await flushPromises()
  panel.dispatchEvent(new window.Event('transitionend'));await flushPromises()
  assert.equal(w.get('.navbar-toggler').attributes('aria-expanded'),'false')
  assert.ok(!panel.classList.contains('show'))
  collapse.dispose();w.unmount()
})
test('loading inside an open product modal preserves the modal keyboard focus', async () => {
  const Loading = require('vue-loading-overlay')
  const { Modal } = require('bootstrap')
  const w = mount(component('views/front/Index.vue'), { attachTo: document.body,
    global: { ...globals, components: { Loading }, stubs: { ...globals.stubs, Loading: false } } })
  const dialog = document.createElement('div')
  dialog.className = 'modal'
  dialog.tabIndex = -1
  dialog.innerHTML = '<div class="modal-dialog"><input aria-label="商品數量"></div>'
  document.body.appendChild(dialog)
  const modal = new Modal(dialog)
  modal.show()
  emitter.emit('isLoading', true)
  await Vue.nextTick()
  dialog.querySelector('input').focus()
  assert.equal(document.activeElement, dialog.querySelector('input'))
  emitter.emit('isLoading', false)
  await Vue.nextTick()
  modal.hide(); modal.dispose(); dialog.remove(); w.unmount()
})
test('completed pickup store matches the store offered during checkout', async () => {
  const checkout = component('views/front/CartAdd.vue').data()
  const completed = component('views/front/CartCompleted.vue')
  const w = mount({ ...completed, created() {} }, { global: globals })
  for (const [index, conveyance] of ['7-11 超商取貨', '全家 超商取貨'].entries()) {
    await w.setData({ orderId: '-qa-order', order: {
      user: { name: 'QA', tel: '0900000000', email: 'qa@example.test', address: '測試地址' },
      products: {}, is_paid: false,
      message: { recipient: { name: 'QA', tel: '0900000000' }, payment: { conveyance, method: '超商取貨付款 (COD)' } }
    } })
    const store = checkout.tempConveyance[index]
    assert.ok(w.text().includes(store.name))
    assert.ok(w.text().includes(store.number))
    assert.ok(w.text().includes(store.address))
    assert.ok(!w.text().includes(checkout.tempConveyance[1 - index].name))
  }
  w.unmount()
})
async function main(){
  let failed=0
  for(const [name,fn] of tests){try{await fn();console.log(`PASS ${name}`)}catch(error){failed++;console.error(`FAIL ${name}\n${error.stack}`)}}
  console.log(`${tests.length-failed}/${tests.length} regression tests passed`)
  process.exitCode=failed?1:0
  dom.window.close()
}
if(require.main===module)main()
module.exports={component,vmFor,load}
