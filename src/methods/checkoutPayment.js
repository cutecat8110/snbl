const storageKey = 'SnblCheckoutPayment'
const defaults = { country: 'TW', conveyance: '7-11 超商取貨', method: '超商取貨付款 (COD)' }
const deliveries = ['國際配送', '7-11 超商取貨', '全家 超商取貨', '新竹物流']
const methods = ['超商取貨付款 (COD)', '貨到付款(COD)(+NT$30)', 'LINE Pay', '信用卡（Visa, Master, JCB付款）', '信用卡分期（3期）', 'ATM 轉帳']
export function loadPayment() {
  try {
    const payment = JSON.parse(sessionStorage.getItem(storageKey))
    if (payment && /^[A-Z]{2}$/.test(payment.country) && deliveries.includes(payment.conveyance) && methods.includes(payment.method)) return payment
  } catch (error) {
    // Storage can be unavailable or contain an invalid previous value.
  }
  return { ...defaults }
}
export function savePayment(payment) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(payment))
  } catch (error) {
    // Checkout still works when browser storage is unavailable.
  }
}
export function shippingCost(payment, total) {
  if (payment.conveyance === '國際配送') return '未包含'
  if (payment.conveyance !== '新竹物流') return 0
  return (Number(total || 0) < 2000 ? 70 : 0) + (payment.method === '貨到付款(COD)(+NT$30)' ? 30 : 0)
}
