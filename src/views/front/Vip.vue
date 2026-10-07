<template>
  <div class="vip-container">
    <img class="img-fluid" :src="image" />
  </div>
</template>
<script>
import request from '@/methods/request'

export default {
  inject: ['emitter'],

  data() {
    return {
      image: []
    }
  },
  methods: {
    render() {
      const id = '-MoCdFKCkh-6S5rqfL-v'
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`

      return request(this, () => this.$http.get(url), (res) => {
        this.image = res.data.article.articleImagesUrl
      })
    }
  },
  created() {
    this.render()
  }
}
</script>

<style lang="scss" scoped>
.vip-container {
  display: flex;
  justify-content: center;

  padding: 2.5rem 0;
}
</style>
