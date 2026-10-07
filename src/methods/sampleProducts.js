// Shuffle a copy; a shrinking catalogue must never leave the page in an endless loop.
export default function sampleProducts(products, limit = products.length) {
  const result = products.slice()
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result.slice(0, limit)
}
