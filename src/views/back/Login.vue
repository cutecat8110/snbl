<template>
  <div class="login">
    <Loading :active="isLoading" :opacity="1" :z-index="1060"></Loading>
    <div class="container shadow-sm">
      <div class="logo">
        <img class="img-fluid" src="@/assets/logo2.png" alt="logo2.png" />
      </div>
      <h1 class="h3 mb-3 font-weight-normal">Snbl 管理後台</h1>
      <div class="w-100">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              id="username"
              v-model="user.username"
              class="form-control"
              type="email"
              placeholder="name@example.com"
              autofocus
              required
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              id="password"
              v-model="user.password"
              class="form-control"
              type="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button :disabled="isLoading" class="btn btn-lg btn-primary w-100" type="submit">登入</button>
        </form>
      </div>
    </div>
    <div class="loginImage" :style="{ backgroundImage: 'url(' + loginImage + ')' }"></div>
  </div>
</template>

<script>
import { saveSession } from '@/methods/authSession'

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loginImage: [],
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    async render() {
      const id = '-MoNVFrUSDDA2ZXh9gFh'
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`
      try {
        const res = await this.$http.get(url, { timeout: 15000 })
        if (res.data.article) this.loginImage = res.data.article.articleImagesUrl
      } catch (error) {
        // The decorative background must not prevent signing in.
        this.loginImage = []
      }
    },
    async login() {
      if (this.isLoading) return
      this.isLoading = true
      try {
        const res = await this.$http.post(`${process.env.VUE_APP_API}admin/signin`, this.user, { timeout: 15000 })
        if (!res.data.success) throw new Error(res.data.message || '帳號或密碼錯誤')
        const { token, expired } = res.data
        saveSession(token, expired)
        await this.$router.push('/admin/products')
      } catch (error) {
        this.user.password = ''
        const message = error.response?.data?.message || error.message
        await this.$swal({ icon: 'error', title: '登入失敗', text: String(message || '請確認帳號密碼及網路連線後再試。') })
      } finally {
        this.isLoading = false
      }
    }
  },
  created() {
    this.render()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.login {
  min-height: 100%;
  display: grid;
  background: rgba(0, 0, 0, 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
  .loginImage {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    opacity: 0.4;
    width: 100%;
    height: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;

    max-width: 450px;
    border-radius: 0.25rem;
    padding: 2.5rem;
    background: #ffffff;
    .logo {
      margin: 0 0 2.5rem 0;
      display: flex;
      justify-content: center;
      img {
        height: $aside-navbar-width;
      }
    }
    h1 {
      @include font-lg;
    }
    .btn {
      margin-top: 1.5rem;
    }
  }
}
</style>
