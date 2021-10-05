<template>
  <nav>
    <div class="aside-navbar-link">
      <router-link to="/products">
        ALL ITEMS
      </router-link>
    </div>
    <div v-for="(item, index) in category" :key="index" class="aside-navbar-link">
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
  margin-left: -1rem;
  width: $aside-navbar-width;
  @include md {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }
  .aside-navbar-link {
    &:first-child {
      a {
        font-weight: 700;
      }
    }
    a {
      font-weight: 400;
      border-radius: 0.25rem;
      display: block;
      padding: 0.5rem 1rem;
      white-space: nowrap;
      color: $gray-900;
      transition: color 150ms ease-in-out;
      &:hover {
        color: $color-main;
      }
      &:active {
        color: $color-main-active;
      }
    }
  }
}
</style>
