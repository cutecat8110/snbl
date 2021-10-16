<template>
  <header class="fixed-top">
    <nav class="navbar navbar-expand-lg shadow-sm navbar-light bg-white">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="logo.png" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav,#navbartest"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <nav class="collapse navbar-collapse flex-grow-0" id="navbarNav">
          <div class="navbar-nav fw-medium">
            <router-link to="/products" class="nav-link">
              ALL ITEMS
            </router-link>
            <router-link to="/products/NEW 新品" class="nav-link highlight">
              NEW 新品
            </router-link>
            <router-link to="/products/上衣" class="nav-link">
              上衣
            </router-link>
            <router-link to="/products/裙裝" class="nav-link">
              裙裝
            </router-link>
            <router-link to="/products/褲裝" class="nav-link">
              褲裝
            </router-link>
          </div>
        </nav>
        <div class="collapse navbar-collapse flex-grow-0" id="navbartest">
          <div class="navbar-nav">
            <div class="nav-link d-flex align-items-center pointer">
              <i class="material-icons md-18 me-2">bookmark</i>
              <span>WISHLIST</span>
            </div>
            <a
              href="#"
              class="nav-link d-flex align-items-center pointer cart"
              :class="qty == 0 ? '' : 'active'"
              @click.prevent="openModal"
            >
              <i class="material-icons md-18 me-2">shopping_cart</i>
              <span>CART ( {{ qty }} )</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <AsideCartModal ref="AsideCartModal"></AsideCartModal>
</template>

<script>
import AsideCartModal from '@/components/common/AsideCartModal.vue';

export default {
  components: {
    AsideCartModal,
  },
  inject: ['emitter'],
  data() {
    return {
      qty: 0,
    };
  },
  methods: {
    openModal() {
      this.$refs.AsideCartModal.openModal();
    },
  },
  created() {
    this.emitter.on('upDateQty', (qty) => {
      this.qty = qty;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
.navbar-light {
  .navbar-nav {
    .nav-link {
      @include font-sm;
      color: $gray-900;
      transition: color 150ms ease-in-out;
      font-weight: 500;

      &:hover {
        color: $gray-600;
      }
      &:active {
        color: $gray-900;
      }
      &.highlight {
        color: $color-main;
        &:hover {
          color: $color-main-light-hover;
        }
        &:active {
          color: $color-main-active;
        }
      }
    }
  }
}
.cart {
  span {
    transition: background 150ms ease-in-out, color 150ms ease-in-out,
      border-radius 300ms ease-in-out, padding 300ms ease-in-out;
  }
  &.active {
    &:hover {
      span {
        background: $color-main-light-hover;
      }
    }
    &:active {
      span {
        background: $color-main-active;
      }
    }
    span {
      border-radius: 50rem;
      padding: 0 0.25rem;
      background: $color-main;
      color: #fff;
    }
  }
}
</style>
