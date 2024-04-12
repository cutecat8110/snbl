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
          <button class="btn btn-lg btn-primary w-100" type="submit">登入</button>
        </form>
      </div>
    </div>
    <div class="loginImage" :style="{ backgroundImage: 'url(' + loginImage + ')' }"></div>
  </div>
</template>

<script>
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
    render() {
      this.isLoading = true
      const id = '-MoNVFrUSDDA2ZXh9gFh'
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`
      this.$http.get(url).then((res) => {
        this.loginImage = res.data.article.articleImagesUrl
        this.isLoading = false
      })
    },
    login() {
      this.$http.post(`${process.env.VUE_APP_API}admin/signin`, this.user).then((res) => {
        if (res.data.success === true) {
          const { token } = res.data
          const { expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/admin/products')
        } else {
          this.user.username = ''
          this.user.password = ''
          // eslint-disable-next-line no-alert
          alert('帳號或密碼錯誤')
        }
      })
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
