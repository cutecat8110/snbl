<template>
  <div class="home-container">
    <h1>購物清單 ({{ qty }})</h1>
    <div class="cart-wrapper">
      <CartList></CartList>
      <CartPayMent :qty="qty"></CartPayMent>
    </div>
  </div>
</template>
<script>
import CartList from '@/components/common/CartList.vue';
import CartPayMent from '@/components/common/CartPayMent.vue';

export default {
  inject: ['emitter'],
  components: { CartList, CartPayMent },
  data() {
    return {
      qty: 0,
    };
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

h1 {
  margin-bottom: 1rem;
  font-weight: 500;
  @include font-xl;
}

.cart-wrapper {
  display: grid;
  grid-gap: 2.5rem;
  grid-template-columns: 1fr 30%;

  white-space: nowrap;
  @include xl {
    grid-gap: 2.5rem;
    grid-template-columns: 1fr;
  }
  @include sm {
    grid-gap: 1.5rem;
  }
}
</style>
