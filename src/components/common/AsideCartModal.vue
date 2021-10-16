<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div
    id="CartModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="CartModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            購物車
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <template v-if="cart.carts">
          <div class="modal-body">
            <template v-if="cart.carts.length != 0">
              <div v-for="item in showCart" :key="item.id" class="cart-card">
                <router-link
                  :to="{ path: `/product/${item.product_id}` }"
                  class="text-reset"
                  @click="hideModal"
                >
                  <img class="img-fluid rounded" :src="item.product.imageUrl" />
                </router-link>
                <div class="text-container cursor">
                  <h4
                    class="product-title"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    :title="item.product.title"
                  >
                    <router-link
                      :to="{ path: `/product/${item.product_id}` }"
                      class="text-reset"
                      @click="hideModal"
                    >
                      {{ item.product.title }}
                    </router-link>
                  </h4>
                  <div class="color-size">
                    {{ item.selected[0].color }}&nbsp;{{ item.selected[0].size }}
                  </div>
                  <div class="price">
                    {{ item.selected[0].qty }}&nbsp;x&nbsp; NT$&nbsp;{{ item.product.price }}
                  </div>
                </div>
                <button class="btn delCart" @click.prevent="delCart(item.id, item.selected[0])">
                  <i class="material-icons md-dark">close</i>
                </button>
              </div>
            </template>
            <div v-else class="nothing">
              <i class="material-icons md-48">shopping_cart</i>
              <div class="nothing-text">購物車目前是空的</div>
              <router-link to="/products" class="btn goshoping" @click="hideModal">
                來去購物吧!
              </router-link>
            </div>
          </div>
          <div v-if="cart.carts.length != 0" class="modal-footer border-0">
            <div class="total">
              <span>商品總數&nbsp;{{ qty }}</span>
              <span>總額&nbsp;NT$&nbsp;{{ cart.total }}</span>
            </div>
            <router-link to="/cart" class="btn w-100 checkout" @click="hideModal">
              前往結帳
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import TooltipMixin from '@/mixins/TooltipMixin';

export default {
  mixins: [modalMixin, TooltipMixin],
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      cart: {},
      selected: {},
      showCart: [],
      qty: 0,
    };
  },
  methods: {
    getCart(addToCart) {
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
        // 計算 qty
        this.qty = 0;
        if (this.cart.carts.length !== 0) {
          this.cart.carts.forEach((item) => {
            this.qty += item.qty;
          });
        }
        this.emitter.emit('upDateQty', this.qty);
        this.emitter.emit('upDateCart', [this.cart, this.showCart]);
        if (addToCart) {
          this.addToCart();
        }
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
      let selectedIndex = '';
      cart.selected.forEach((item, index) => {
        if (item.color.match(selected.color) && item.size.match(selected.size)) {
          selectedIndex = index;
        }
      });
      cart.qty -= selected.qty;
      cart.selected.splice(selectedIndex, 1);
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
    delAllCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url).then((res) => {
        if (res.data.message) {
          this.getCart();
        }
      });
    },
    addToCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: this.selected.id,
        qty: this.selected.qty,
        selected: [],
      };
      // 檢查購物車是否已有該商品
      const checkCart = this.cart.carts.filter((item) => item.product_id.match(this.selected.id));
      let checkProduct = '';

      if (checkCart.length === 0) {
        cart.selected = [
          {
            color: this.selected.selected.color,
            size: this.selected.selected.size,
            qty: this.selected.qty,
          },
        ];
      } else {
        checkCart[0].selected.forEach((item, index) => {
          if (
            item.color.match(this.selected.selected.color)
            && item.size.match(this.selected.selected.size)
          ) {
            checkProduct = index;
          }
        });
      }

      if (checkProduct === '' && checkCart.length !== 0) {
        cart.selected = [
          ...checkCart[0].selected,
          {
            color: this.selected.selected.color,
            size: this.selected.selected.size,
            qty: this.selected.qty,
          },
        ];
      } else if (checkProduct !== '') {
        const tempSelected = JSON.parse(JSON.stringify(checkCart[0].selected));
        tempSelected[checkProduct].qty += this.selected.qty;
        cart.selected = tempSelected;
      }

      this.$http.post(url, { data: cart }).then((res) => {
        if (res.data.success) {
          this.getCart();
          this.$swal({
            icon: 'success',
            title: '加入成功',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    },
  },
  created() {
    this.getCart();
    this.emitter.on('emitToCart', (item) => {
      this.selected = item;
      this.getCart(item);
    });
    this.emitter.on('upDateAsideCartModal', (item) => {
      this.cart = JSON.parse(JSON.stringify(item[0]));
      this.showCart = JSON.parse(JSON.stringify(item[1]));
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

#CartModal {
  .modal-dialog {
    height: 100%;
    width: 100%;
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
    .modal-content {
      height: 100%;
      .modal-header {
        padding: 1.5rem 1.5rem 0 1.5rem;
        .modal-title {
          @include font-lg;
        }
        .btn-close {
          &:focus {
            box-shadow: none;
            opacity: 0.5;
          }
          &:active {
            box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
          }
        }
      }
      .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 1rem;
        }
        &::-webkit-scrollbar-thumb {
          border: 0.35rem solid transparent;
          background-clip: padding-box;
          background-color: #c1c1c1;
          border-radius: 10rem;
          &:hover {
            background-color: #a8a8a8;
          }
          &:active {
            background-color: #787878;
          }
        }
        .cart-card {
          padding: 0.5rem;
          margin: 0 -0.5rem;
          display: grid;
          grid-template-columns: 4rem 1fr 1.5rem;
          grid-gap: 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid transparent;

          transition: background 150ms ease-in-out, border 150ms ease-in-out;
          &:hover {
            background: $gray-100;
            border: 1px solid $gray-250;
            .delCart {
              opacity: 1;
              transform: translateX(-0.125rem);
            }
          }
          .text-container {
            overflow: hidden;
            .product-title {
              margin-bottom: 0.125rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .product-title {
              @include font-md;
            }
            .color-size {
              @include font-sm;

              color: $gray-600;
              font-weight: 500;
            }
            .price {
              @include font-sm;

              // font-weight: 500;
              color: $gray-600;
            }
          }
          .delCart {
            padding: 0;
            opacity: 0;
            transform: translateX(0.125rem);

            transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
            .material-icons {
              color: $gray-500;
              transition: color 150ms ease-in-out;
            }
            &:focus {
              box-shadow: none;
            }
            &:hover > .material-icons {
              color: rgba(0, 0, 0, 0.54);
            }
            &:active > .material-icons {
              color: rgba(0, 0, 0, 0.65);
            }
            &:active {
              box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
            }
          }
        }
        .nothing {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: $aside-navbar-width;
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
      .modal-footer {
        padding: 1.5rem 1.5rem 2.5rem 1.5rem;
        .total {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 0 0 1rem 0;
          color: $gray-600;
        }
        .checkout {
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
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(50px, 0);
}
.modal.show .modal-dialog {
  transform: none;
}
</style>
