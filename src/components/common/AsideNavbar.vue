<template>
  <nav>
    <div class="all-items">
      <router-link to="/products">
        ALL ITEMS
      </router-link>
    </div>
    <div v-for="(item, index) in category" :key="index" class="p-2 px-3">
      <router-link :to="'/products/' + item">
        {{ item }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      category: ['NEW 新品', '上衣', '裙裝', '褲裝', '配飾', '套裝專區'],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

nav {

  @include lg {
    display: flex;
    flex-wrap: wrap;
  }
  a {
    white-space: nowrap;
    color: $gray-600;
    font-weight: 500;
    transition: color 150ms ease-in-out;
    &:hover {
      color: $color-main;
    }
  }
  .all-items {
    padding: 0.5rem;
    @include lg {
      padding: 0.5rem 1rem;
    }
    & > a {
      color: $gray-900;
      transition: color 150ms ease-in-out;
      &:hover {
        color: $color-main;
      }
    }
  }
}
</style>
