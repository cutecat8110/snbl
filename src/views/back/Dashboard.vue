<template>
  <div id="dashboard">
    <BackHeader />
    <ToastMessages />
    <router-view />
  </div>
</template>

<script>
import BackHeader from '@/components/back/BackHeader.vue'
import ToastMessages from '@/components/back/ToastMessages.vue'
import emitter from '@/methods/eventBus'
import httpMessageState from '@/methods/pushMessageState'

export default {
  components: { BackHeader, ToastMessages },
  provide() {
    return {
      emitter,
      httpMessageState
    }
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$swal({
          icon: 'warning',
          title: '登入過期',
          text: '請重新登入'
        }).then(() => {
          this.$router.push('/login')
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#dashboard {
  min-height: 100%;
  background: #f0f2f5;
  padding-top: 56px;
}
</style>
