// Keep editable quantities numeric, within the existing 1–99 purchase limit.
export default function quantity(value, allowEmpty = false) {
  const digits = String(value == null ? '' : value).replace(/[^\d]/g, '')
  if (!digits && allowEmpty) return ''
  return Math.max(1, Math.min(99, Number(digits) || 1))
}
