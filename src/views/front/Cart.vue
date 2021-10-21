<template>
  <div class="container py-4 ">
    <CartProcess></CartProcess>
    <h1>購物清單 ({{ qty }})</h1>
    <div class="cart-wrapper">
      <CartList></CartList>
      <CartPayMent :qty="qty"></CartPayMent>
    </div>
  </div>
</template>
<script>
import CartProcess from '@/components/common/CartProcess.vue';
import CartList from '@/components/common/CartList.vue';
import CartPayMent from '@/components/common/CartPayMent.vue';

export default {
  inject: ['emitter'],
  components: {
    CartProcess,
    CartList,
    CartPayMent,
  },
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
.container {
  .cart-process-wrapper {
    margin-top: 1rem;
    margin-bottom: 2.5rem;
  }
  h1 {
    @include font-xl;
    font-weight: 700;
    margin-bottom: 1rem;
    // text-align: center;
  }
  .cart-wrapper {
    display: grid;
    grid-template-columns: 1fr 30%;
    grid-gap: 3.5rem;
    white-space: nowrap;
  }
}
</style>
