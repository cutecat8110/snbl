<template>
  <div class="product-card" v-for="item in productcard" :key="item.id">
    <div class="img-wrapper">
      <router-link :to="{ path: `/product/${item.id}` }">
        <img :src="item.imageUrl" class="img-fluid pointer" alt="..." />
      </router-link>
    </div>
    <div class="product-card-body">
      <div class="unselect card-text">
        <h4 class="title pointer">
          <router-link :to="{ path: `/product/${item.id}` }" class="text-reset">
            {{ item.title }}
          </router-link>
        </h4>
        <div class="price">
          <span class="me-2">NT$&nbsp;{{ item.price }}</span>
          <span class="origin-price">NT$&nbsp;{{ item.origin_price }}</span>
        </div>
      </div>
      <div class="pointer">
        <i class="material-icons">bookmark_border</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filterproducts', 'products'],
  computed: {
    productcard() {
      if (this.$route.params.id) {
        return this.filterproducts;
      }
      return this.products;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.product-card {
  padding: 1rem;
  margin: -1rem;
  border-radius: 0.25rem;
  transition: box-shadow 150ms ease-in-out;
  &:hover {
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.075);
  }
  &:hover img {
    transform: scale(1.02);
  }
  @include xs {
    padding: 0rem;
    margin: 0rem;
    &:hover {
      box-shadow: none;
    }
    &:hover img {
      transform: none;
    }
  }
  .img-wrapper {
    border-radius: 0.25rem;
    overflow: hidden;
    img {
      transition: transform 300ms ease-in-out;
    }
  }
  .product-card-body {
    display: grid;
    grid-template-columns: 1fr 24px;
    grid-column-gap: 0.5rem;
    padding: 1rem 0 0.5rem 0;
    .card-text {
      display: flex;
      flex-direction: column;
      .title {
        font-weight: 400;
        @include font-md;
        margin-bottom: 0.125rem;
        transition: text-decoration 900ms ease-in-out;
      }
      .price {
        @include font-sm;
        font-weight: 500;
        color: $gray-600;

        @include xs {
          display: flex;
          flex-direction: column;
        }
        .origin-price {
          font-weight: 300;
          color: $gray-500;
          text-decoration: line-through;
        }
      }
    }
    .material-icons {
      color: $gray-500;
      transition: color 150ms ease-in-out;
      &:hover {
        color: $color-main;
      }
    }
  }
}
</style>
