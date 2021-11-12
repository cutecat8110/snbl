<template>
  <div class="login">
    <div class="container shadow-sm">
      <div class="logo">
        <img class="img-fluid" src="@/assets/logo2.png" alt="logo2.png" />
      </div>
      <h1 class="h3 mb-3 font-weight-normal">Snbl 管理後台</h1>
      <div class="w-100">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="user.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$http.post(`${process.env.VUE_APP_API}admin/signin`, this.user).then((res) => {
        if (res.data.success === true) {
          console.log(res.data.message, this.user);
          const { token } = res.data;
          const { expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/admin/products');
        } else {
          console.log(res.data.message, this.user);
          this.user.username = '';
          this.user.password = '';
          // eslint-disable-next-line no-alert
          alert('帳號或密碼錯誤');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.login {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100%;
  background: #f0f2f5;

  .container {
    display: flex;
    flex-direction: column;

    max-width: 450px;
    border-radius: 0.25rem;
    padding: 2.5rem;
    background: #ffffff;
    .logo {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      img {
        height: $aside-navbar-width;
      }
    }
    h1 {
      @include font-lg;
    }
  }
}
</style>
