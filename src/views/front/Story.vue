<template>
  <img class="img-fluid" :src="image" />
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
      const id = '-Mo9YavblcdjTc7-_DRD';
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
