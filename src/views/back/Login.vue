<template>
  <div class="about">
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="col-8">
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
      <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: 'cutecat8110@gmail.com',
        password: 'Vul3xm4000000',
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
