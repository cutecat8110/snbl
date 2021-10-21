<template>
  <section>
    <div v-if="cart.carts" class="cart-list">
      <template v-if="cart.carts.length != 0">
        <div class="list-head">
          <div>商品</div>
          <div></div>
          <div>數量</div>
          <div>單價</div>
          <div>小計</div>
          <div></div>
        </div>
        <div class="list-card" v-for="(item, index) in showCart" :key="item.id">
          <!-- 商品資訊 -->
          <img class="img-fluid rounded" :src="item.product.imageUrl" />
          <div class="product-infor">
            <div class="title">{{ item.product.title }}</div>
            <div class="color"><span> COLOR : &nbsp;</span>{{ item.selected[0].color }}</div>
            <div class="size"><span>SIZE : &nbsp;</span>{{ item.selected[0].size }}</div>
          </div>
          <!-- 數量 -->
          <div class="align-box">
            <div class="qty input-group border rounded border-0">
              <div>
                <button
                  class="qty-btn btn"
                  type="button"
                  @mouseup="item.selected[0].qty--, this.upDate(index, item.id, item.selected[0])"
                  :disabled="item.selected[0].qty <= 1"
                  :class="{ disabled: item.selected[0].qty <= 1 }"
                >
                  <i class="material-icons md-dark">remove</i>
                </button>
              </div>
              <input
                type="text"
                class="form-control text-center shadow-none rounded"
                :min="min"
                :max="max"
                @input="handleInput(index, $event)"
                @blur="makeUp(index), this.upDate(index, item.id, item.selected[0])"
                v-model="item.selected[0].qty"
              />
              <div>
                <button
                  class="qty-btn btn"
                  type="button"
                  @mouseup="item.selected[0].qty++, this.upDate(index, item.id, item.selected[0])"
                  :disabled="item.selected[0].qty >= 99"
                  :class="{ disabled: item.selected[0].qty >= 99 }"
                >
                  <i class="material-icons md-dark">add</i>
                </button>
              </div>
            </div>
          </div>
          <!-- 售價 -->
          <div class="align-box">
            {{ $filters.currency(item.product.price) }}
          </div>
          <!-- 小計 -->
          <div class="align-box">
            {{ $filters.currency(item.product.price * item.selected[0].qty) }}
          </div>
          <!-- 刪除 -->
          <div class="align-box">
            <button class="btn delCart" @click.prevent="delCart(item.id, item.selected[0])">
              <i class="material-icons md-dark">close</i>
            </button>
          </div>
        </div>
      </template>
      <div v-else class="nothing-wrapper">
        <div class="nothing">
          <i class="material-icons md-48">shopping_cart</i>
          <div class="nothing-text">購物車目前是空的</div>
          <router-link to="/products" class="btn goshoping">
            來去購物吧!
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      cart: {},
      selected: {},
      qty: 0,
      min: 1,
      max: 99,
      showCart: [],
      tempShowCart: [],
    };
  },
  methods: {
    delCart(id, selected) {
      this.emitter.emit('emitDelCart', [id, selected]);
    },
    handleInput(index, e) {
      if (e.target.value.replace(/[^\d]/g, '') !== '') {
        const inputQty = e.target.value.replace(/[^\d]/g, '');
        if (inputQty > this.max) {
          console.log(1);
          this.showCart[index].selected[0].qty = this.max;
        } else if (inputQty < this.min) {
          console.log(2);
          this.showCart[index].selected[0].qty.qty = this.min;
        } else {
          console.log(3);
          this.showCart[index].selected[0].qty = Number(e.target.value.replace(/[^\d]/g, ''));
        }
      } else {
        this.showCart[index].selected[0].qty = e.target.value.replace(/[^\d]/g, '');
      }
    },
    makeUp(index) {
      if (this.showCart[index].selected[0].qty === '') {
        this.showCart[index].selected[0].qty = 1;
      }
    },
    upDate(index, id, selected) {
      if (this.showCart[index].selected[0].qty !== this.tempShowCart[index].selected[0].qty) {
        this.emitter.emit('emitUpDate', [index, id, selected]);
      }
    },
  },
  created() {
    this.emitter.on('upDateCart', (item) => {
      this.cart = JSON.parse(JSON.stringify(item[0]));
      this.showCart = JSON.parse(JSON.stringify(item[1]));
      this.tempShowCart = JSON.parse(JSON.stringify(item[2]));
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
section {
  .cart-list {
    border: 1px solid $gray-250;
    border-radius: 0.25rem;
    .list-head,
    .list-card {
      display: grid;
      grid-template-columns: 10rem 3fr 10rem 1fr 1fr 2.875rem;
      grid-gap: 1rem;
    }
    .list-head {
      padding: 0.25rem 1rem;
      border-radius: 0.25rem;
      & > div {
        text-align: center;
      }
    }
    .list-card {
      padding: 1rem;
      border: 1px solid transparent;
      position: relative;
      margin: -1px;
      transition: border 150ms ease-in-out;
      &::after {
        content: '';
        position: absolute;
        z-index: -1;
        top: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background: $gray-250;
      }
      &:last-child {
        border-radius: 0 0 0.25rem 0.25rem;
      }
      .product-infor {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          @include font-md;
          font-weight: 500;
          margin-bottom: 0.5rem;
          white-space: normal;
        }
        .color,
        .size {
          @include font-sm;
          color: $gray-600;
          font-weight: 500;
          span {
            font-weight: 400;
          }
        }
        .color {
          margin-bottom: 0.125rem;
        }
      }
      .qty {
        .qty-btn {
          padding: 0.375rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: box-shadow 150ms ease-in-out;
          .md-dark {
            transition: color 150ms ease-in-out;
          }
          &:focus {
            box-shadow: none;
          }
          &:hover > .md-dark {
            color: rgba(0, 0, 0, 0.65);
          }
          &:active > .md-dark {
            color: rgba(0, 0, 0, 0.74);
          }
          &:active {
            box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
          }
          &.disabled {
            pointer-events: none;
            opacity: 0.38;
          }
        }
        input {
          padding: 0.375rem;
          margin: 0 0.25rem !important;
          background: $gray-250;
          border: 0;
        }
      }
      .align-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .delCart {
        opacity: 0;
        line-height: 0;
        padding: 0.375rem;
        transform: translateX(0.125rem);
        transition: opacity 300ms ease-in-out, transform 300ms ease-in-out,
          box-shadow 150ms ease-in-out;
        .material-icons {
          color: rgba(0, 0, 0, 0.54);
          transition: color 150ms ease-in-out;
          &:hover {
            color: rgba(0, 0, 0, 0.65);
          }
          &:active {
            color: rgba(0, 0, 0, 0.74);
          }
        }
        &:focus {
          box-shadow: none;
        }
        &:active {
          box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
        }
      }
      &:hover {
        border: 1px solid $color-border-active;
        .delCart {
          opacity: 1;
          transform: translateX(-0.125rem);
        }
      }
    }
    .nothing-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .nothing {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .material-icons {
          margin-bottom: 1rem;
          color: $gray-600;
        }
        .nothing-text {
          margin-bottom: 1rem;
          font-weight: 500;
          color: $gray-600;
        }
        .goshoping {
          margin: 0;
          color: #fff;
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
}
</style>
