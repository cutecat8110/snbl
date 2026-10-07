const pendingReads = new WeakMap()

// Header and page mount together. Share only their in-flight public catalogue read;
// the next navigation still reads fresh data, and writes/cart reads are never cached.
export default function readCatalogue(http) {
  if (!pendingReads.has(http)) {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
    const read = http.get(url, { timeout: 15000 }).finally(() => pendingReads.delete(http))
    pendingReads.set(http, read)
  }
  return pendingReads.get(http)
}
