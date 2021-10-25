<template>
  <section>
    <div class="web">
      <router-link to="/cart" class="process-wrapper">
        <div class="process">
          <i class="material-icons md-36">local_atm</i>
          <div class="text">
            <div class="cn">確認清單及付款方式</div>
            <div class="en">Cart & Check out</div>
          </div>
        </div>
      </router-link>
      <router-link to="/cart/add" class="process-wrapper">
        <div class="process">
          <i class="material-icons md-36">edit</i>
          <div class="text">
            <div class="cn">填寫訂單資料</div>
            <div class="en">Write The Add</div>
          </div>
        </div>
      </router-link>
      <div class="process-wrapper">
        <div class="process">
          <i class="material-icons md-36">local_shipping</i>
          <div class="text">
            <div class="cn">訂購完成</div>
            <div class="en">Oder completed</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <router-link to="/cart" class="process-wrapper">
        <div class="text">
          <div class="order">1.</div>
          <div class="text-group">
            <div class="cn">確認清單及付款方式</div>
            <div class="en">Cart & Check out</div>
          </div>
        </div>
        <i class="material-icons md-24">local_atm</i>
      </router-link>
      <router-link to="/cart/add" class="process-wrapper">
        <div class="text">
          <div class="order">2.</div>
          <div class="text-group">
            <div class="cn">填寫訂單資料</div>
            <div class="en">Write The Add</div>
          </div>
        </div>
        <i class="material-icons md-24">edit</i>
      </router-link>
      <div class="process-wrapper">
        <div class="text">
          <div class="order">3.</div>
          <div class="text-group">
            <div class="cn">訂購完成</div>
            <div class="en">Oder completed</div>
          </div>
        </div>
        <i class="material-icons md-24">local_shipping</i>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

section {
  margin-top: 1rem;
  .disabled {
    pointer-events: none;
  }

  .web {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow: hidden;

    height: 5rem;
    border-radius: 0.25rem;
    @include sm {
      display: none;
    }

    .process-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      color: $gray-600;
      background: $gray-250;
      @include md {
        justify-content: flex-end;

        padding-right: 1rem;
      }

      .process {
        display: flex;
        align-items: center;
        z-index: 2;
      }

      .material-icons {
        margin-right: 1rem;
        opacity: 0.54;
      }

      .text {
        .cn {
          font-weight: 500;
        }

        .en {
          @include font-sm;
        }
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 100%;

        width: 4rem;
        height: 4rem;
        border-radius: 0.25rem;
        background: $gray-250;
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::before {
        box-shadow: 5px -5px 0 3px #ffffff;
      }

      &.active {
        color: $gray-250;
        background: $gray-600;
        pointer-events: none;

        &::after,
        &::before {
          background: $gray-600;
        }
      }
    }
  }

  .mobile {
    display: none;
    overflow: hidden;

    @include sm {
      display: block;
    }

    .process-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      color: $gray-600;
      background: $gray-250;

      &:not(:last-child) {
        margin-bottom: 0.25rem;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;

        width: 1rem;
        height: 1rem;
        border-radius: 0 0 0.25rem 0;
        background: $gray-250;
        transform: translate(135%, 48%) rotate(45deg);
      }

      &::before {
        box-shadow: 0.15rem 0.15rem 0 2px #ffffff;
      }

      .text {
        display: flex;
        align-items: center;

        .order {
          margin: 0.5rem;
          font-weight: 500;
          @include font-lg;
        }

        .en {
          font-weight: 300;
          @include font-sm;
        }
      }

      .material-icons {
        opacity: 0.54;
      }

      &.active {
        color: $gray-250;
        background: $gray-600;
        pointer-events: none;

        &::after,
        &::before {
          background: $gray-600;
        }
      }
    }
  }
}
</style>
