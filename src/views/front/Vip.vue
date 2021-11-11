<template>
  <div class="vip-container">
    <img class="img-fluid" :src="image" />
  </div>
</template>
<script>
export default {
  inject: ['emitter'],

  data() {
    return {
      image: [],
    };
  },
  methods: {
    render() {
      this.emitter.emit('isLoading', true);
      const id = '-MoCdFKCkh-6S5rqfL-v';
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;

      this.$http.get(url).then((res) => {
        this.image = res.data.article.articleImagesUrl;
        this.emitter.emit('isLoading', false);
      });
    },
  },
  created() {
    this.render();
  },
};
</script>

<style lang="scss" scoped>
.vip-container {
  display: flex;
  justify-content: center;

  padding: 2.5rem 0;
}
</style>
