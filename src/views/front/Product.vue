<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="container py-4">
    <div class="aside-navbar">
      <AsideNavbar></AsideNavbar>
    </div>
    <main>
      <SubNavbar :product="product"></SubNavbar>
      <div class="product">
        <ProductSwiper :tempProduct="product"></ProductSwiper>
        <img class="img-fluid" :src="product.modelImageUrl" alt="形象封面.png" />
        <div ref="modelImagesUrl"></div>
        <img
          class="img-fluid"
          v-for="(item, index) in product.modelImagesUrl"
          :key="index"
          :src="item"
          :alt="'展示圖.png' + index"
        />
        <div ref="detalImagesUrl"></div>
        <img
          class="img-fluid"
          v-for="(item, index) in product.detalImagesUrl"
          :key="index"
          :src="item"
          :alt="'細節圖.png' + index"
        />
        <img ref="infolImageUrl" class="img-fluid" :src="product.infolImageUrl" alt="款號.png" />
        <img class="img-fluid" :src="product.sizeImageUrl" alt="尺碼.png" />
        <img class="img-fluid" :src="product.modelInfoImageUrl" alt="模特.png" />
        <img class="img-fluid" :src="product.tryOnImageUrl" alt="試穿.png" />
        <img class="img-fluid" :src="product.tabricImageUrl" alt="面料.png" />
      </div>
      <div class="product-form">
        <ProductForm :product="product" @subNav="subNav"></ProductForm>
      </div>
    </main>
  </div>
</template>

<script>
import AsideNavbar from '@/components/common/AsideNavbar.vue';
import ProductForm from '@/components/common/ProductForm.vue';
import ProductSwiper from '@/components/common/ProductSwiper.vue';
import SubNavbar from '@/components/common/SubNavbar.vue';

export default {
  components: {
    AsideNavbar,
    ProductForm,
    ProductSwiper,
    SubNavbar,
  },
  data() {
    return {
      isLoading: false,
      product: [],
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url).then((res) => {
        this.product = res.data.product;
        this.isLoading = false;
      });
    },
    subNav(item) {
      console.log(this.$refs[item].offsetTop);
      window.scrollTo(0, this.$refs[item].offsetTop - 56);
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.container {
  display: grid;
  grid-template-columns: $aside-navbar-width 1fr;
  grid-column-gap: 5em;
  @include lg {
    grid-template-columns: 1fr;
  }
  .aside-navbar {
    width: $aside-navbar-width;
    position: relative;
    @include lg {
      width: initial;
    }
    nav {
      position: fixed;
      @include lg {
        position: static;
      }
    }
  }
  main {
    display: grid;
    grid-template-columns: 1fr $product-form-width;
    grid-column-gap: 2.5em;
    @include lg {
      grid-template-columns: 1fr;
    }
    nav {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
      @include lg {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;
      }
    }
    .product {
      display: grid;
      grid-template-columns: 1fr;

      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2;
      grid-row-end: 3;
      @include lg {
        margin-top: 2rem;
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 3;
        grid-row-end: 4;
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    .product-form {
      width: $product-form-width;
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
      @include lg {
        width: auto;
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
      }
    }
  }
}
</style>
