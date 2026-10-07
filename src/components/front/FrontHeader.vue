<template>
  <header ref="header" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="logo.png" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-target="#navbarNav,#navbartest"
          data-bs-toggle="collapse"
          aria-label="切換導覽選單"
          aria-controls="navbarNav navbartest"
          aria-expanded="false"
          @keydown.esc="closeNavigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <nav id="navbarNav" class="collapse navbar-collapse flex-grow-0">
          <div class="navbar-nav fw-medium" @click="closeNavigation">
            <router-link class="nav-link" to="/products"> ALL ITEMS </router-link>
            <router-link class="nav-link highlight" to="/products/NEW 新品"> NEW 新品 </router-link>
            <router-link class="nav-link" to="/products/上衣"> 上衣 </router-link>
            <router-link class="nav-link" to="/products/裙裝"> 裙裝 </router-link>
            <router-link class="nav-link" to="/products/褲裝"> 褲裝 </router-link>
          </div>
        </nav>
        <div id="navbartest" class="collapse navbar-collapse flex-grow-0">
          <div class="navbar-nav">
            <a
              :class="myFavoriteQty == 0 ? '' : 'active'"
              class="nav-link d-flex align-items-center pointer cart"
              href="#"
              @click.prevent="openModal('AsideWishModal')"
            >
              <i class="material-icons md-18 me-2">bookmark</i>
              <span>WISHLIST {{ myFavoriteQty === 0 ? '' : `( ` + myFavoriteQty + ` )` }} </span>
            </a>
            <a
              :class="qty == 0 ? '' : 'active'"
              class="nav-link d-flex align-items-center pointer cart"
              href="#"
              @click.prevent="openModal('AsideCartModal')"
            >
              <i class="material-icons md-18 me-2">shopping_cart</i>
              <span>CART {{ qty === 0 ? '' : `( ` + qty + ` )` }}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <AsideCartModal
    ref="AsideCartModal"
    :cart="cart"
    :qty="qty"
    :showCart="showCart"
    @delCart="delCart"
  ></AsideCartModal>
  <AsideWishModal
    ref="AsideWishModal"
    :myFavoriteProducts="myFavoriteProducts"
    @addMyFavorite="addMyFavorite"
  ></AsideWishModal>
</template>

<script>
import { Collapse } from 'bootstrap'
import quantity from '@/methods/quantity'
import request from '@/methods/request'
import readCatalogue from '@/methods/catalogue'
import AsideCartModal from '@/components/common/AsideCartModal.vue'
import AsideWishModal from '@/components/common/AsideWishModal.vue'

const sotrageMethods = {
  save(favorite) {
    const favoriteString = JSON.stringify(favorite)
    localStorage.setItem('Snblfavorite', favoriteString)
  },
  get() {
    return JSON.parse(localStorage.getItem('Snblfavorite'))
  }
}

export default {
  components: {
    AsideCartModal,
    AsideWishModal
  },
  inject: ['emitter'],
  data() {
    return {
      qty: 0,
      cart: {},
      showCart: [],
      selected: {},
      tempShowCart: [],
      productsAll: [],
      myFavorite: sotrageMethods.get() || []
    }
  },
  watch: {
    $route: {
      handler() {
        this.getCart()
        this.closeNavigation()
      },
      immediate: true
    }
  },
  computed: {
    myFavoriteQty() {
      return this.myFavorite.length
    },
    myFavoriteProducts() {
      const tempMyFavoriteProducts = []
      this.productsAll.forEach((item) => {
        if (this.myFavorite.includes(item.id)) {
          tempMyFavoriteProducts.push(item)
        }
      })
      return tempMyFavoriteProducts
    }
  },
  methods: {
    addMyFavorite(id) {
      if (this.myFavorite.includes(id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(id), 1)
        this.$swal({
          icon: 'success',
          title: '商品已移出願望清單',
          timer: 1500,
          showConfirmButton: false
        })
      } else {
        this.myFavorite.push(id)
        this.$swal({
          icon: 'success',
          title: '商品已加入願望清單',
          timer: 1500,
          showConfirmButton: false
        })
      }
      sotrageMethods.save(this.myFavorite)
      this.emitter.emit('getMyFavorite')
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      return request(this, () => this.$http.get(url, { timeout: 15000 }), (res) => {
        const carts = res.data.data.carts.map((item) => {
          const variants = item.selected?.length ? item.selected : [{ color: '', size: '', qty: item.qty }]
          const selected = variants.map((variant) => ({ ...variant, qty: Math.max(1, Number(variant.qty) || 1) }))
          return { ...item, selected, qty: selected.reduce((total, variant) => total + variant.qty, 0) }
        })
        this.cart = { ...res.data.data, carts }
        this.showCart = []
        carts.forEach((item) => {
          item.selected.forEach((variant) => {
            this.showCart.push({ ...item, selected: [{ ...variant }] })
          })
        })
        this.tempShowCart = JSON.parse(JSON.stringify(this.showCart))
        this.qty = this.cart.carts.reduce((total, item) => total + Number(item.qty), 0)
        this.emitter.emit('upDateQty', this.qty)
        this.emitter.emit('upDateCart', [this.cart, this.showCart, this.tempShowCart])
        return true
      })
    },
    getAll() {
      return request(this, () => readCatalogue(this.$http), (res) => {
        this.productsAll = res.data.products
      })
    },
    queueCart(change) {
      // Refresh before each write so rapid actions cannot overwrite an earlier variant.
      this.cartMutation = (this.cartMutation || Promise.resolve()).then(async () => {
        if (await this.getCart()) return change()
        return undefined
      })
      return this.cartMutation
    },
    delCart(id, selected) {
      const variant = { ...selected }
      return this.queueCart(() => {
        const item = this.cart.carts.find((entry) => entry.id === id)
        if (!item) return undefined
        const remaining = item.selected.filter((entry) =>
          entry.color !== variant.color || entry.size !== variant.size)
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
        const send = remaining.length
          ? () => this.$http.put(url, { data: {
            product_id: item.product_id,
            qty: remaining.reduce((total, entry) => total + entry.qty, 0),
            selected: remaining
          } })
          : () => this.$http.delete(url)
        return request(this, send, async () => {
          await this.getCart()
          this.$swal({ icon: 'success', title: '商品已移出購物車', timer: 1500, showConfirmButton: false })
        })
      })
    },
    addToCart(selection) {
      if (!selection?.selected?.color || !selection.selected.size) return Promise.resolve()
      const selected = JSON.parse(JSON.stringify(selection))
      selected.qty = quantity(selected.qty)
      return this.queueCart(() => {
        const item = this.cart.carts.find((entry) => entry.product_id === selected.id)
        const variants = item ? item.selected.map((entry) => ({ ...entry })) : []
        const variant = variants.find((entry) =>
          entry.color === selected.selected.color && entry.size === selected.selected.size)
        const added = selected.qty
        if (variant) variant.qty += added
        else variants.push({ ...selected.selected, qty: added })
        const cart = { product_id: selected.id, qty: added, selected: variants }
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
        return request(this, () => this.$http.post(url, { data: cart }), async () => {
          await this.getCart()
          this.$swal({ icon: 'success', title: '商品已加入購物車', timer: 1500, showConfirmButton: false })
        })
      })
    },
    upDate(index, id, selected) {
      const variant = { ...selected, qty: quantity(selected.qty) }
      return this.queueCart(() => {
        const item = this.cart.carts.find((entry) => entry.id === id)
        if (!item) return undefined
        const variants = item.selected.map((entry) =>
          entry.color === variant.color && entry.size === variant.size ? variant : entry)
        const cart = {
          product_id: item.product_id,
          qty: variants.reduce((total, entry) => total + entry.qty, 0),
          selected: variants
        }
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
        return request(this, () => this.$http.put(url, { data: cart }), () => this.getCart())
      })
    },
    closeNavigation() {
      if (!this.$refs.header) return
      this.$refs.header.querySelectorAll('.navbar-collapse').forEach((element) => {
        const collapse = Collapse.getOrCreateInstance(element, { toggle: false })
        if (element.classList.contains('collapsing') && this.$refs.header.querySelector('.navbar-toggler').getAttribute('aria-expanded') === 'true') {
          element.addEventListener('shown.bs.collapse', () => collapse.hide(), { once: true })
        } else collapse.hide()
      })
    },
    openModal(item) {
      this.closeNavigation()
      this.$refs[item].openModal()
    },
    createOrder(item) {
      if (this.submittingOrder) return undefined
      this.submittingOrder = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      return request(this, () => this.$http.post(url, { data: item }), async (res) => {
        await this.getCart()
        await this.$router.push(`/order/${res.data.orderId}`)
      }).finally(() => { this.submittingOrder = false })
    }
  },
  mounted() {
    this.desktopLayout = window.matchMedia('(min-width: 992px)')
    this.desktopLayout.addEventListener('change', this.closeNavigation)
  },
  beforeUnmount() {
    if (this.desktopLayout) this.desktopLayout.removeEventListener('change', this.closeNavigation)
  },
  created() {
    this.getAll()
    this.emitter.on('emitToCart', (item) => {
      if (item) this.addToCart(item)
      else this.getCart()
    })
    this.emitter.on('emitDelCart', (item) => this.delCart(...item))
    this.emitter.on('emitUpDate', (item) => this.upDate(...item))
    this.emitter.on('emitCreateOrder', (item) => this.createOrder(item))
    this.emitter.on('emitUpDateMyFavorite', (id) => this.addMyFavorite(id))
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
.navbar-light {
  .container {
    min-height: 2.5rem;
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
}
.cart {
  span {
    transition:
      background 150ms ease-in-out,
      color 150ms ease-in-out,
      border-radius 300ms ease-in-out,
      padding 300ms ease-in-out;
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

@media (max-width: 991px) {
  .navbar {
    max-height: 100vh;
    max-height: 100dvh;
    overflow-y: auto;
  }
}
</style>
