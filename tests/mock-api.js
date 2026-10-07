/* Local-only API for destructive checkout QA. Never forwards requests to Hexschool. */
const http = require('node:http')
const products = require('./fixtures/products.json')
let carts = []
let coupon = false
let sequence = 0
const orders = new Map()
function summary() {
  const total = carts.reduce((sum, item) => sum + item.qty * item.product.price, 0)
  return { carts, total, final_total: coupon ? total * 0.9 : total }
}
http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Content-Type', 'application/json')
  if (req.method === 'OPTIONS') { res.end(); return }
  const url = new URL(req.url, 'http://localhost')
  const route = url.pathname.replace(/^\/api\/haohao/, '')
  let input = ''
  for await (const part of req) input += part
  const data = input ? JSON.parse(input).data : undefined
  const reply = payload => res.end(JSON.stringify({ success: true, ...payload }))
  if (req.method === 'GET' && route.startsWith('/products')) return reply({ products, pagination: { current_page: 1, total_pages: 1, has_pre: false, has_next: false } })
  if (req.method === 'GET' && route.startsWith('/product/')) return reply({ product: products.find(p => p.id === route.split('/').pop()) })
  if (req.method === 'GET' && route.startsWith('/article/')) return reply({ article: { articleImagesUrl: [products[0].imageUrl] } })
  if (route === '/cart' && req.method === 'GET') return reply({ data: summary() })
  if (route === '/cart' && req.method === 'POST') {
    let item = carts.find(c => c.product_id === data.product_id)
    if (!item) { item = { id: `qa-cart-${++sequence}`, product_id: data.product_id, product: products.find(p => p.id === data.product_id), qty: 0 }; carts.push(item) }
    item.qty += data.qty; item.selected = data.selected
    return reply({ data: item })
  }
  if (route.startsWith('/cart/') && req.method === 'PUT') {
    const item = carts.find(c => c.id === route.split('/').pop())
    if (item) Object.assign(item, data)
    return reply({})
  }
  if (route.startsWith('/cart/') && req.method === 'DELETE') { carts = carts.filter(c => c.id !== route.split('/').pop()); return reply({}) }
  if (route === '/coupon' && req.method === 'POST') {
    if (!['QA10','reset'].includes(data.code)) return reply({ success: false, message: '優惠碼不存在' })
    coupon = data.code === 'QA10'; return reply({ data: summary() })
  }
  if (route === '/order' && req.method === 'POST') {
    const id = `qa-order-${++sequence}`
    orders.set(id, { id, user: data.user, message: data.message, products: Object.fromEntries(carts.map(c => [c.id, c])), total: summary().final_total, is_paid: false, create_at: Math.floor(Date.now()/1000) })
    carts = []; coupon = false
    return reply({ orderId: id })
  }
  if (route.startsWith('/order/') && req.method === 'GET') return reply({ order: orders.get(route.split('/').pop()) })
  if (route.startsWith('/pay/') && req.method === 'POST') { const order = orders.get(route.split('/').pop()); if (order) order.is_paid = true; return reply({}) }
  res.statusCode = 404
  reply({ success: false, message: url.pathname === '/admin/signin' ? '隔離 QA API 不提供管理員登入；請使用未覆寫 VUE_APP_API 的一般預覽站。' : 'QA fixture route unavailable' })
}).listen(8787, '127.0.0.1', () => console.log('Isolated QA API: http://127.0.0.1:8787 (memory only; restart to reset)'))
