import dimensions from '@/assets/image-dimensions.json'

const imagePrefix = 'https://storage.googleapis.com/vue-course-api.appspot.com/haohao/'

// Keep original URLs/pixels. Known dimensions reserve space before lazy decoding.
export function imageSize(src) {
  const size = typeof src === 'string' && src.startsWith(imagePrefix)
    ? dimensions[src.slice(imagePrefix.length)] : undefined
  return size ? { width: size[0], height: size[1] } : {}
}

export function imageSources(value) {
  return [...new Set((Array.isArray(value) ? value : [value])
    .filter((src) => typeof src === 'string' && src.trim()).map((src) => src.trim()))]
}

export default function imageAttributes(src, loading = 'lazy') {
  const source = typeof src === 'string' ? src.trim() : ''
  return { src: source || undefined, ...imageSize(source), loading, decoding: 'async' }
}
