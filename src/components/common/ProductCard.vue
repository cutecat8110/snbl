<template>
  <div class="product-card" v-for="product in productcard" :key="product.id">
    <div class="img-wrapper">
      <router-link :to="{ path: `/product/${product.id}` }">
        <img :src="product.imageUrl" class="img-fluid pointer" alt="..." />
      </router-link>
    </div>
    <div class="product-card-body">
      <div class="unselect card-text">
        <h4 class="title pointer">
          <router-link :to="{ path: `/product/${product.id}` }" class="text-reset">
            {{ product.title }}
          </router-link>
        </h4>
        <div class="price">
          <span class="me-2">NT$&nbsp;{{ product.price }}</span>
          <span v-if="product.price != product.origin_price" class="origin-price">
            NT$&nbsp;{{ product.origin_price }}
          </span>
        </div>
      </div>
      <a
        class="pointer"
        @click.prevent="emitUpDateMyFavorite(product.id)"
        :class="{ active: myFavorite.includes(product.id) }"
      >
        <i class="material-icons">
          {{ myFavorite.includes(product.id) ? 'bookmark' : 'bookmark_border' }}
        </i>
      </a>
    </div>
  </div>
</template>

<script>
const sotrageMethods = {
  save(favorite) {
    const favoriteString = JSON.stringify(favorite);
    localStorage.setItem('Snblfavorite', favoriteString);
  },
  get() {
    return JSON.parse(localStorage.getItem('Snblfavorite'));
  },
};

export default {
  props: ['filterproducts', 'products'],
  inject: ['emitter'],

  data() {
    return {
      myFavorite: sotrageMethods.get() || [],
    };
  },
  computed: {
    productcard() {
      if (this.$route.params.id) {
        return this.filterproducts;
      }
      return this.products;
    },
  },
  methods: {
    emitUpDateMyFavorite(id) {
      this.emitter.emit('emitUpDateMyFavorite', id);
    },
  },
  created() {
    this.emitter.on('getMyFavorite', () => {
      this.myFavorite = sotrageMethods.get();
    });
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
    a {
      .material-icons {
        color: $gray-500;
        transition: color 150ms ease-in-out;
        &:hover {
          color: $color-main;
        }
        &:active {
          color: $color-main-active;
        }
      }
      &.active {
        .material-icons {
          color: $color-main;
          &:active {
            color: $color-main-active;
          }
        }
      }
    }
  }
}
</style>
