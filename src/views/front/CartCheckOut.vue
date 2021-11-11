<template>
  <div class="home-container">
    <h1>購物清單 ({{ qty }})</h1>
    <div class="cart-wrapper">
      <CartList></CartList>
      <CartPayMent :qty="qty"></CartPayMent>
      <div class="remark-message">
        <ul>
          <li>
            賣場商品採現貨及預購，預購商品需等候7-14個工作天(不含假日)。
          </li>
          <li>
            賣場無法合併訂單，若欲湊滿免運門檻，請在結帳前確認完畢。
          </li>
          <li>
            若有折價券，請於結帳時點選【使用優惠代碼】輸入後點選【套用】，訂單成立後無法修改。
          </li>
          <li>
            請注意！訂單成立後無法修改/異動，若需修改訂單請聯繫【客服】取消訂單，再自行重新訂購，原訂單享有之活動優惠/庫存，需以再次訂購之當時活動為準。
          </li>
          <li>
            『本店支援 LINE Pay 付款，歡迎使用 LINE Pay 進行結帳』
          </li>
        </ul>
      </div>
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
    grid-gap: 2rem;
    grid-template-columns: 1fr;
  }
  @include sm {
    grid-gap: 1.5rem;
  }

  .remark-message {
    grid-column-start: 1;
    grid-column-end: 3;

    border: 1px solid $gray-250;
    border-radius: 0.25rem;
    padding: 1rem;
    white-space: normal;
    white-space: normal;
    color: $gray-600;
    @include xl {
      grid-column-start: 1;
      grid-column-end: 2;
    }

    ul {
      margin: 0;
      padding: 0 0 0 1.07rem;
      font-weight: 300;
      white-space: normal;
      @include font-sm;

      & > li:not(:last-child) {
        margin-bottom: 0.25rem;
      }

      li {
        &::marker {
          content: '• ';

          font-weight: bold;
        }
      }
    }
  }
}
</style>
