<template>
  <nav>
    <a href="#" class="py-2 d-block text-muted" @click.prevent="">
      ALL ITEMS
    </a>
    <ul class="list-unstyled">
      <li v-for="(item, index) in category" :key="index" class="d-flex a">
        <a href="#" class="py-2 d-block text-muted" @click.prevent="">
          {{ item }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      category: ['NEW 新品', '上衣', '裙裝', '褲裝', '配飾', '套裝專區'],
    };
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
</style>
