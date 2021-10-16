<template>
  <section class="cart-process-wrapper">
    <div class="cart-process-content">
      <div class="cart-process-card active">
        <i class="material-icons md-36">local_atm</i>
        <div class="text">
          <div class="cn">確認清單及付款方式</div>
          <div class="en">Cart & Check out</div>
        </div>
      </div>
      <div class="cart-process-card">
        <i class="material-icons md-36">edit</i>
        <div class="text">
          <div class="cn">填寫訂單資料</div>
          <div class="en">Write The Add</div>
        </div>
      </div>
      <div class="cart-process-card">
        <i class="material-icons md-36">local_shipping</i>
        <div class="text">
          <div class="cn">訂購完成</div>
          <div class="en">Oder completed</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
.cart-process-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 0.25rem;
  overflow: hidden;
  height: 5rem;
  .cart-process-card {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gray-250;
    color: $gray-600;
    position: relative;
    .material-icons {
      margin-right: 1rem;
      opacity: 0.54;
    }
    .cn {
      font-weight: 500;
    }
    .en {
      @include font-sm;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 4rem;
      height: 4rem;
      left: 100%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      border-radius: 0.25rem;
    }
    &::before {
      z-index: 1;
      box-shadow: 5px -5px 0 3px #fff;
    }
    &::after {
      z-index: 2;
    }
    &.active {
      background: $gray-600;
      color: $gray-250;
      &::after {
        background: $gray-600;
      }
    }
  }
}
</style>
