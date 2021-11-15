<template>
  <div class="container py-4">
    <div class="aside-navbar">
      <AsideNavbar></AsideNavbar>
    </div>
    <main>
      <div class="sub-navbar">
        <SubNavbar :selectCategory="selectCategory"></SubNavbar>
      </div>
      <div class="product-list">
        <ProductCard :filterproducts="filterproducts" :products="products"></ProductCard>
      </div>
      <Pagination v-if="!selectCategory" :pages="pagination" @emit-page="getData"></Pagination>
    </main>
  </div>
</template>

<script>
import AsideNavbar from '@/components/common/AsideNavbar.vue';
import SubNavbar from '@/components/common/SubNavbar.vue';
import Pagination from '@/components/front/Pagination.vue';
import ProductCard from '@/components/common/ProductCard.vue';

export default {
  inject: ['emitter'],
  components: {
    AsideNavbar,
    SubNavbar,
    Pagination,
    ProductCard,
  },
  data() {
    return {
      products: [],
      productsAll: [],
      pagination: [],
      currentPage: 1,
      selectCategory: '',
    };
  },
  methods: {
    getData(page = 1) {
      this.emitter.emit('isLoading', true);
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        window.scrollTo({
          top: 0,
        });
        this.emitter.emit('isLoading', false);
      });
    },
    getAll() {
      this.emitter.emit('isLoading', true);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url).then((res) => {
        this.productsAll = res.data.products;
        this.emitter.emit('isLoading', false);
      });
    },
  },
  computed: {
    filterproducts() {
      return this.productsAll.filter((item) => item.category.match(this.selectCategory));
    },
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        if (!this.productsAll.length) {
          this.getAll();
        }
      } else if (!this.$route.params.id) {
        if (!this.products.length) {
          this.getData();
        }
      }
      const { id } = this.$route.params;
      this.selectCategory = id;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.selectCategory = id;
    if (this.$route.params.id) {
      this.getAll();
    } else {
      this.getData();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.container {
  display: grid;
  grid-template-columns: $aside-navbar-width 1fr;
  grid-column-gap: 5rem;
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
    .product-list {
      padding: 1rem 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;

      @include xl {
        grid-template-columns: repeat(3, 1fr);
      }
      @include sm {
        grid-template-columns: repeat(2, 1fr);
      }
      @include xs {
        grid-gap: 1rem;
      }
    }
  }
}
</style>
