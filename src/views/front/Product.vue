<template>
  <div class="container py-4">
    <div class="aside-navbar">
      <AsideNavbar></AsideNavbar>
    </div>
    <main>
      <div class="product">
        <div class="product-title">
          <h1>
            {{ product.title }}
          </h1>
          <SubNavbar :product="product"></SubNavbar>
        </div>
        <ProductSwiper :tempProduct="product"></ProductSwiper>
        <img class="img-fluid" :src="product.modelImageUrl" />
        <div ref="modelImagesUrl"></div>
        <img
          v-for="(item, index) in product.modelImagesUrl"
          :key="index"
          class="img-fluid"
          :src="item"
        />
        <div ref="detalImagesUrl"></div>
        <img
          v-for="(item, index) in product.detalImagesUrl"
          :key="index"
          class="img-fluid"
          :src="item"
        />
        <img class="img-fluid" :src="product.tabricImageUrl" />
        <img ref="infolImageUrl" class="img-fluid" :src="product.infolImageUrl" />
        <img class="img-fluid" :src="product.sizeImageUrl" />
        <img class="img-fluid" :src="product.modelInfoImageUrl" />
        <img class="img-fluid" :src="product.tryOnImageUrl" />
        <MoreSwiper :tempProduct="randomProducts"></MoreSwiper>
      </div>
      <div class="product-form">
        <ProductForm :product="product" @subNav="subNav"></ProductForm>
      </div>
    </main>
  </div>
</template>

<script>
import request from '@/methods/request'
import sampleProducts from '@/methods/sampleProducts'
import AsideNavbar from '@/components/common/AsideNavbar.vue'
import MoreSwiper from '@/components/common/MoreSwiper.vue'
import ProductForm from '@/components/common/ProductForm.vue'
import ProductSwiper from '@/components/common/ProductSwiper.vue'
import SubNavbar from '@/components/common/SubNavbar.vue'

export default {
  inject: ['emitter'],
  components: {
    AsideNavbar,
    ProductForm,
    ProductSwiper,
    SubNavbar,
    MoreSwiper
  },
  data() {
    return {
      product: [],
      productsAll: [],
      randomProducts: []
    }
  },
  watch: {
    $route() {
      this.getProduct()
    }
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params
      if (!id || !this.$route.path.startsWith('/product/')) return undefined
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      return request(this, () => this.$http.get(url), (res) => {
        if (this.$route.params.id !== id) return undefined
        this.product = res.data.product
        return this.getAll()
      })
    },
    subNav(item) {
      window.scrollTo(0, this.$refs[item].offsetTop - 56)
    },
    getAll() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      return request(this, () => this.$http.get(url), (res) => {
        this.productsAll = res.data.products
        this.getLookAlick()
      })
    },
    getLookAlick() {
      const filterProducts = this.productsAll.filter(
        (product) => product.category === this.product.category
      )

      this.randomProducts = sampleProducts(filterProducts)
    }
  },
  created() {
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.container {
  display: grid;
  grid-template-columns: $aside-navbar-width 1fr;
  grid-column-gap: 5em;
  @include md {
    grid-template-columns: 1fr;
  }
  .aside-navbar {
    width: $aside-navbar-width;
    @include md {
      width: initial;
    }
    nav {
      position: fixed;
      @include md {
        position: static;
      }
    }
  }
  main {
    display: grid;
    grid-template-columns: 1fr $product-form-width;
    grid-column-gap: 2.5em;
    @include md {
      grid-template-columns: 1fr;
    }
    .product {
      display: grid;
      grid-template-columns: 1fr;
      @include md {
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
      }
      .product-title {
        margin: 0.25rem 0 1rem 0;
        h1 {
          @include font-xl;
          display: none;
          margin: 0;
          @include md {
            display: block;
          }
        }
      }
    }
    .product-form {
      width: $product-form-width;
      @include md {
        width: auto;
      }
    }
  }
}
</style>
