<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>

  <div class="container py-4 ">
    <CartProcess></CartProcess>
    <h1>購物車 ( {{ qty }} )</h1>
    <div class="cart-wrapper">
      <div v-if="cart.carts" class="cart-list">
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
            <div class="qty input-group border flex-nowrap rounded border-0">
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
      </div>
      <div class="cart-payment">
        <label for="title" class="form-label"> 輸入優惠券代碼 </label>
        <div class="form-group position-relative">
          <input id="title" type="text" class="form-control" placeholder="請輸入" />
        </div>
        <label for="category" class="form-label"> 配送地區 </label>
        <select class="form-select">
          <option value="" disabled>請選擇</option>
        </select>
        <label class="form-label">付款方式</label>
        <div class="d-flex flex-wrap">
          <label class="d-inline-block py-2 me-2" v-for="(item, index) in payment" :key="index">
            <input class="form-check-input" type="radio" />
            <span class="px-2"> {{ item }} </span>
          </label>
        </div>
        <label for="category" class="form-label"> 運送方式 </label>
        <select class="form-select">
          <option value="" disabled>請選擇</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import CartProcess from '@/components/common/CartProcess.vue';

export default {
  components: {
    CartProcess,
  },
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      cart: {},
      selected: {},
      qty: 0,
      min: 1,
      max: 99,
      showCart: [],
      tempShowCart: [],
      timer: null,
      payment: ['信用卡線上刷卡', '貨到付款(宅配)', '貨到付款(超商)', '銀聯卡', 'Fasney後支付'],
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.cart = res.data.data;
        // 渲染畫面
        this.showCart = [];
        this.cart.carts.forEach((item) => {
          if (item.selected.length === 1) {
            this.showCart.push(item);
          } else {
            for (let i = 0; i < item.selected.length; i += 1) {
              const tempProduct = JSON.parse(JSON.stringify(item));
              const singleSelected = [tempProduct.selected[i]];
              delete tempProduct.selected;
              tempProduct.selected = singleSelected;
              this.showCart.push(tempProduct);
            }
          }
        });
        this.tempShowCart = JSON.parse(JSON.stringify(this.showCart));
        // 計算 qty
        this.qty = 0;
        if (this.cart.carts.length !== 0) {
          this.cart.carts.forEach((item) => {
            this.qty += item.qty;
          });
        }
        this.emitter.emit('upDateQty', this.qty);
        // 同步 AsideCartModal
        this.emitter.emit('upDateAsideCartModal', [this.cart, this.showCart]);
      });
    },
    delCart(id, selected) {
      const delCart = this.cart.carts.filter((item) => item.id.match(id));
      if (delCart[0].selected.length === 1) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
        this.$http.delete(url).then((res) => {
          if (res.data.success) {
            this.getCart();
            this.$swal({
              icon: 'success',
              title: '移除成功',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } else {
        this.delPartCart(id, selected, delCart);
      }
    },
    delPartCart(id, selected, delCart) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      const delPartCart = delCart;
      const cart = {
        product_id: delPartCart[0].product_id,
        qty: delPartCart[0].qty,
        selected: delPartCart[0].selected,
      };
      let partSelectedIndex = '';
      cart.selected.forEach((item, index) => {
        if (item.color.match(selected.color) && item.size.match(selected.size)) {
          partSelectedIndex = index;
        }
      });
      cart.qty -= selected.qty;
      cart.selected.splice(partSelectedIndex, 1);
      this.$http.put(url, { data: cart }).then(() => {
        this.getCart();
        this.$swal({
          icon: 'success',
          title: '移除成功',
          timer: 1500,
          showConfirmButton: false,
        });
      });
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
        this.isLoading = true;
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
        const delCart = this.cart.carts.filter((item) => item.id.match(id));
        const cart = {
          product_id: delCart[0].product_id,
          qty: delCart[0].qty,
          selected: delCart[0].selected,
        };
        let selectedIndex = '';
        cart.selected.forEach((item, i) => {
          if (item.color.match(selected.color) && item.size.match(selected.size)) {
            selectedIndex = i;
          }
        });
        cart.qty = cart.qty - this.tempShowCart[index].selected[0].qty + selected.qty;
        cart.selected.splice(selectedIndex, 1, selected);
        this.$http.put(url, { data: cart }).then(() => {
          this.getCart();
          this.isLoading = false;
        });
      }
    },
  },
  created() {
    this.getCart();
    this.emitter.on('upDateCart', (item) => {
      this.cart = JSON.parse(JSON.stringify(item[0]));
      this.showCart = JSON.parse(JSON.stringify(item[1]));
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
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  .cart-wrapper {
    display: grid;
    grid-template-columns: 1fr 30%;
    grid-gap: 2.5rem;
    white-space: nowrap;
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
          transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
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
    }
    .cart-payment {
    }
  }
}
</style>
