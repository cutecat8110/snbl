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
        <ProductSwiper :key="product.id" :tempProduct="product"></ProductSwiper>
        <img class="img-fluid" v-if="product.modelImageUrl" v-bind="$imageAttributes(product.modelImageUrl)" />
        <div ref="modelImagesUrl"></div>
        <img
          v-for="(item, index) in product.modelImagesUrl"
          :key="index"
          class="img-fluid"
          v-bind="$imageAttributes(item)"
        />
        <div ref="detalImagesUrl"></div>
        <img
          v-for="(item, index) in product.detalImagesUrl"
          :key="index"
          class="img-fluid"
          v-bind="$imageAttributes(item)"
        />
        <img class="img-fluid" v-if="product.tabricImageUrl" v-bind="$imageAttributes(product.tabricImageUrl)" />
        <img ref="infolImageUrl" class="img-fluid" v-if="product.infolImageUrl" v-bind="$imageAttributes(product.infolImageUrl)" />
        <img class="img-fluid" v-if="product.sizeImageUrl" v-bind="$imageAttributes(product.sizeImageUrl)" />
        <img class="img-fluid" v-if="product.modelInfoImageUrl" v-bind="$imageAttributes(product.modelInfoImageUrl)" />
        <img class="img-fluid" v-if="product.tryOnImageUrl" v-bind="$imageAttributes(product.tryOnImageUrl)" />
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
import readCatalogue from '@/methods/catalogue'
import sampleProducts from '@/methods/sampleProducts'
import { imageSources } from '@/methods/images'
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
      return request(this, () => this.$http.get(url, { timeout: 15000 }), (res) => {
        if (this.$route.params.id !== id) return undefined
        this.product = { ...res.data.product,
          modelImagesUrl: imageSources(res.data.product.modelImagesUrl),
          detalImagesUrl: imageSources(res.data.product.detalImagesUrl) }
        return this.getAll()
      })
    },
    subNav(item) {
      const target = this.$refs[item]
      if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 56)
    },
    getAll() {
      return request(this, () => readCatalogue(this.$http), (res) => {
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
