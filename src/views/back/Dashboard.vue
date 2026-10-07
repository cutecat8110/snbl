<template>
  <div id="dashboard">
    <BackHeader />
    <ToastMessages />
    <router-view v-if="authenticated" />
  </div>
</template>

<script>
import { clearSession } from '@/methods/authSession'
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
  data() {
    return { authenticated: false }
  },
  async created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    if (!token) {
      this.$router.replace('/login')
      return
    }
    try {
      const res = await this.$http.post(`${process.env.VUE_APP_API}api/user/check`, {}, { timeout: 15000 })
      if (!res.data.success) throw new Error('登入過期')
      this.authenticated = true
    } catch (error) {
      clearSession(this.$http)
      await this.$swal({ icon: 'warning', title: '無法驗證登入', text: '請重新登入' })
      this.$router.replace('/login')
    }
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
