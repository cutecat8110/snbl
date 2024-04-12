<template>
  <header class="fixed-top">
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
          <div class="navbar-nav">
            <router-link class="nav-link" to="/admin/products">產品</router-link>
            <router-link class="nav-link" to="/admin/orders">訂單</router-link>
            <router-link class="nav-link" to="/admin/coupons">優惠</router-link>
            <router-link class="nav-link" to="/admin/article">文章</router-link>
          </div>
          <div class="navbar-nav ms-auto">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
