import mitt from 'mitt'
import { getCurrentInstance, onBeforeUnmount } from 'vue'

const emitter = mitt()
const subscribe = emitter.on.bind(emitter)

// Options API components subscribe in created(); release exactly their own listeners.
emitter.on = (type, handler) => {
  subscribe(type, handler)
  if (getCurrentInstance()) onBeforeUnmount(() => emitter.off(type, handler))
}

export default emitter
