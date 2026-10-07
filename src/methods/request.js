import emitter from './eventBus'

let pending = 0
let showingError = false

// Balance concurrent frontend requests, including rejected and unsuccessful responses.
export default async function request(vm, send, receive, allowFailure = false) {
  pending += 1
  emitter.emit('isLoading', true)
  try {
    const response = await send()
    if (!allowFailure && response.data.success === false) {
      throw new Error(response.data.message || '資料讀取失敗')
    }
    return await receive(response)
  } catch (error) {
    if (!showingError) {
      showingError = true
      Promise.resolve(vm.$swal({
        icon: 'error',
        title: '暫時無法完成操作',
        text: error.response?.data?.message || error.message || '請稍後再試'
      })).finally(() => { showingError = false })
    }
    return undefined
  } finally {
    pending -= 1
    emitter.emit('isLoading', pending > 0)
  }
}
