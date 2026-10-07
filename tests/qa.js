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
    $swal: async () => ({}), $filters: { currency: (value) => String(value ?? '') } },
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
  document.cookie='hexToken=test-only'
  destination='';await admin.created.call(vm)
  assert.equal(calls,1);assert.equal(destination,'/login');assert.equal(vm.authenticated,false)
  assert.ok(!document.cookie.includes('hexToken='))
  document.cookie='hexToken=test-only'
  vm.$http.post=async()=>({data:{success:true}})
  await admin.created.call(vm);assert.equal(vm.authenticated,true)
  document.cookie='hexToken=; Max-Age=0'
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
    assert.ok(document.cookie.includes('hexToken='))
    let destination=''
    const vm=vmFor(component('components/back/BackHeader.vue'),{$http:{defaults:{headers:{common:{Authorization:'test-only'}}},post:async()=>{if(fail)throw Error('offline');return{data:{success:true}}}},$swal:async()=>{},$router:{replace:x=>{destination=x}}})
    await vm.logout()
    assert.ok(!document.cookie.includes('hexToken='));assert.equal(vm.$http.defaults.headers.common.Authorization,undefined);assert.equal(destination,'/')
  }
})
test('successful login stores an expiring session and navigates to products',async()=>{
  let destination='',writes=0
  const vm=vmFor(component('views/back/Login.vue'),{$http:{post:async()=>{writes++;return{data:{success:true,token:'test-only',expired:Date.now()+60000}}}},$swal:async()=>{},$router:{push:x=>{destination=x}}})
  await Promise.all([vm.login(),vm.login()]);assert.equal(writes,1);assert.equal(destination,'/admin/products');assert.ok(document.cookie.includes('hexToken=test-only'))
  document.cookie='hexToken=; Max-Age=0; path=/'
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
