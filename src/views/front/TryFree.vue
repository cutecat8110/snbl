<template>
  <div class="try-container">
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
      const id = '-MoCAPot4RFi3FXRZQCy'
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
.try-container {
  display: flex;
  justify-content: center;

  padding: 2.5rem 0;
}
</style>
