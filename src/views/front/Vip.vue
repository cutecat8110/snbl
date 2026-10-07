<template>
  <div class="vip-container">
    <img v-for="(src, index) in image" :key="src" class="img-fluid"
      v-bind="$imageAttributes(src, index === 0 ? 'eager' : 'lazy')" alt="" />
  </div>
</template>
<script>
import request from '@/methods/request'
import { imageSources } from '@/methods/images'

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

      return request(this, () => this.$http.get(url, { timeout: 15000 }), (res) => {
        this.image = imageSources(res.data.article.articleImagesUrl)
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2.5rem 0;
}
</style>
