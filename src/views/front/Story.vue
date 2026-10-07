<template>
  <img class="img-fluid" :src="image" />
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
      const id = '-Mo9YavblcdjTc7-_DRD'
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
