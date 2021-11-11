<template>
  <div class="container py-4">
    <CartProcess></CartProcess>
    <main v-if="qty != 0">
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </main>
    <div v-else class="nothing-wrapper">
      <div class="nothing">
        <i class="material-icons md-96">shopping_cart</i>
        <div class="nothing-text">購物車目前是空的</div>
        <router-link to="/products" class="btn goshoping">
          來去購物吧!
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import CartProcess from '@/components/common/CartProcess.vue';

export default {
  inject: ['emitter'],
  components: {
    CartProcess,
  },
  data() {
    return {
      qty: 0,
    };
  },
  watch: {
    qty: {
      handler() {
        if (this.qty === 0 && this.$route.path !== '/cart') {
          this.$router.push('/cart');
        }
      },
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

.container {
  display: grid;
  flex: 1;
  grid-gap: 2.5rem;
  grid-template-rows: 6rem 1fr;

  @include sm {
    grid-gap: 1.5rem;
    grid-template-rows: 13.125rem 1fr;
  }

  .nothing-wrapper {
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: column;
    justify-content: center;

    border: 1px solid $gray-250;
    border-radius: 0.25rem;

    .nothing {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .material-icons {
        margin-bottom: 1.5rem;
        color: $gray-600;
      }

      .nothing-text {
        margin-bottom: 1.5rem;
        font-weight: 500;
        color: $gray-600;
        @include font-xxl;
      }

      .goshoping {
        margin-bottom: 1.5rem;
        color: #ffffff;
        background: $color-main;

        transition: background 150ms ease-in-out;

        &:hover {
          background: $color-main-hover;
        }

        &:active {
          background: $color-main-active;
        }

        &:focus {
          box-shadow: none;
        }

        &:active {
          box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
        }
      }
    }
  }
}
</style>
