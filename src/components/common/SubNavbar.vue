<template>
  <nav>
    <router-link class="sub-navbar-link" to="/"> HOME </router-link>
    <i class="material-icons md-18 md-dark">chevron_right</i>
    <router-link v-if="product || selectCategory" class="sub-navbar-link" to="/products">
      所有商品
    </router-link>
    <div v-else class="sub-navbar-link cursor">所有商品</div>

    <template v-if="selectCategory">
      <i class="material-icons md-18 md-dark">chevron_right</i>
      <div class="sub-navbar-link cursor">{{ selectCategory }}</div>
    </template>
    <template v-else-if="product">
      <i class="material-icons md-18 md-dark">chevron_right</i>
      <router-link class="sub-navbar-link" :to="'/products/' + product.category">
        {{ product.category }}
      </router-link>
    </template>
  </nav>
</template>

<script>
export default {
  props: ['product', 'selectCategory']
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

nav {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: $gray-600;
  @include font-sm;
  @include md {
    padding-top: 0.25rem;
  }

  .sub-navbar-link {
    color: $gray-600;
    white-space: nowrap;
    transition: color 150ms ease-in-out;
    &:hover:not(div) {
      color: $gray-900;
    }
  }
  .material-icons {
    opacity: 0.38;
  }
}
</style>
