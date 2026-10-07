<template>
  <header ref="header" class="fixed-top">
    <nav class="navbar navbar-expand-lg shadow-sm navbar-light bg-white">
      <div class="container">
        <router-link class="navbar-brand" to="/admin/products"> 後台 </router-link>
        <button
          class="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-bs-target="#navbarNav"
          data-bs-toggle="collapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" class="collapse navbar-collapse">
          <div class="navbar-nav" @click="closeNavigation">
            <router-link class="nav-link" to="/admin/products">產品</router-link>
            <router-link class="nav-link" to="/admin/orders">訂單</router-link>
            <router-link class="nav-link" to="/admin/coupons">優惠</router-link>
            <router-link class="nav-link" to="/admin/article">文章</router-link>
          </div>
          <div class="navbar-nav ms-auto" @click="closeNavigation">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { Collapse } from 'bootstrap'
import { clearSession } from '@/methods/authSession'

export default {
  data() {
    return { loggingOut: false }
  },
  methods: {
    closeNavigation() {
      const { header } = this.$refs
      if (!header) return
      const element = header.querySelector('.navbar-collapse')
      const collapse = Collapse.getOrCreateInstance(element, { toggle: false })
      if (element.classList.contains('collapsing') && header.querySelector('.navbar-toggler').getAttribute('aria-expanded') === 'true') {
        element.addEventListener('shown.bs.collapse', () => collapse.hide(), { once: true })
      } else collapse.hide()
    },
    async logout() {
      if (this.loggingOut) return
      this.loggingOut = true
      try {
        await this.$http.post(`${process.env.VUE_APP_API}logout`, {}, { timeout: 15000 })
      } catch (error) {
        this.$swal({ icon: 'warning', title: '已清除本機登入', text: '暫時無法連線到登出服務，請稍後再試。' })
      } finally {
        clearSession(this.$http)
        this.loggingOut = false
        this.$router.replace('/')
      }
    }
  },
  watch: {
    $route() { this.closeNavigation() }
  },
  mounted() {
    this.desktopLayout = window.matchMedia('(min-width: 992px)')
    this.desktopLayout.addEventListener('change', this.closeNavigation)
  },
  beforeUnmount() {
    this.desktopLayout.removeEventListener('change', this.closeNavigation)
  }
}
</script>
