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
  <AsideCartModal
    ref="AsideCartModal"
    :cart="cart"
    :showCart="showCart"
    :qty="qty"
    @delCart="delCart"
  ></AsideCartModal>
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
      cart: {},
      showCart: [],
      selected: {},
      tempShowCart: [],
    };
  },
  watch: {
    $route: {
      handler() {
        this.getCart();
      },
      immediate: true,
    },
  },
  methods: {
    getCart(addToCart) {
      this.emitter.emit('isLoading', true);
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
        this.emitter.emit('upDateCart', [this.cart, this.showCart, this.tempShowCart]);
        if (addToCart) {
          this.addToCart();
        } else {
          this.emitter.emit('isLoading', false);
        }
      });
    },
    delCart(id, selected) {
      this.emitter.emit('isLoading', true);
      const delCart = this.cart.carts.filter((item) => item.id.match(id));
      if (delCart[0].selected.length === 1) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
        this.$http.delete(url).then((res) => {
          if (res.data.success) {
            this.getCart();
            this.$swal({
              icon: 'success',
              title: '商品已移出購物車',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } else {
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
            title: '商品已移出購物車',
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
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
            title: '商品已加入購物車',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    },
    upDate(index, id, selected) {
      this.emitter.emit('isLoading', true);
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
      });
    },
    openModal() {
      this.$refs.AsideCartModal.openModal();
    },
    createOrder(item) {
      console.log(item);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, { data: item }).then((res) => {
        if (res.data.success) {
          this.getCart();
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
    this.emitter.on('emitDelCart', (item) => {
      this.delCart(...item);
    });
    this.emitter.on('emitUpDate', (item) => {
      this.upDate(...item);
    });
    this.emitter.on('emitCreateOrder', (item) => {
      this.createOrder(item);
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
