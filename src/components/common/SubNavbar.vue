<template>
  <nav>
    <template v-if="product">
      <router-link to="/" class="sub-navbar-link">
        HOME
      </router-link>
      <i class="material-icons md-18 unselect">chevron_right</i>
      <router-link to="/products" class="sub-navbar-link">
        所有商品
      </router-link>
      <i class="material-icons md-18 unselect">chevron_right</i>
      <router-link :to="'/products/' + product.category" class="sub-navbar-link">
        {{ product.category }}
      </router-link>
      <i class="material-icons md-18 product-title unselect">chevron_right</i>
      <div class="product-title sub-navbar-link">{{ product.title }}</div>
    </template>

    <template v-else-if="selectCategory">
      <router-link to="/" class="sub-navbar-link">
        HOME
      </router-link>
      <i class="material-icons md-18 unselect">chevron_right</i>
      <router-link to="/products" class="sub-navbar-link">
        所有商品
      </router-link>
      <i class="material-icons md-18 unselect">chevron_right</i>
      <div class="sub-navbar-link">{{ selectCategory }}</div>
    </template>

    <template v-else>
      <router-link to="/" class="sub-navbar-link">
        HOME
      </router-link>
      <i class="material-icons md-18 unselect">chevron_right</i>
      <div class="sub-navbar-link">所有商品</div>
    </template>
  </nav>
</template>

<script>
export default {
  props: ['product', 'selectCategory'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

nav {
  font-weight: 500;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  color: $gray-600;
  flex-wrap: wrap;

  .sub-navbar-link {
    color: $gray-600;
    white-space: nowrap;
    &:hover:not(:last-child) {
      color: $color-main;
    }
  }

  i {
    margin: 0 0.5rem;
  }
  .product-title {
    display: none;
    @include lg {
      display: block;
    }
  }
}
</style>
