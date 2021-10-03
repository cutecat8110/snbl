<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="container py-4">
    <div class="aside-navbar">
      <AsideNavbar></AsideNavbar>
    </div>
    <main>
      <div class="sub-navbar">
        <SubNavbar :selectCategory="selectCategory"></SubNavbar>
      </div>
      <div class="product-list">
        <template v-if="$route.params.id">
          <div class="card m-3" v-for="item in filterproducts" :key="item.id">
            <div class="card-container">
              <div class="img-hover-zoom">
                <img :src="item.imageUrl" class="card-img-top rounded-0 pointer" alt="..." />
              </div>
              <div class="card-body">
                <div class="unselect card-text">
                  <h4 class="title pointer mb-1">
                    <router-link :to="{ path: `/product/${item.id}` }" class="text-reset">
                      {{ item.title }}
                    </router-link>
                  </h4>
                  <div class="price-container">
                    <span class="price me-2">NT$&nbsp;{{ item.price }}</span>
                    <span class="price origin-price">NT$&nbsp;{{ item.origin_price }}</span>
                  </div>
                </div>
                <div class="pointer">
                  <i class="material-icons">bookmark_border</i>
                </div>
              </div>
            </div>
            <div class="card-wrapper rounded"></div>
          </div>
        </template>
        <template v-else>
          <div class="card m-3" v-for="item in products" :key="item.id">
            <div class="card-container">
              <div class="img-hover-zoom">
                <img :src="item.imageUrl" class="card-img-top rounded-0 pointer" alt="..." />
              </div>
              <div class="card-body">
                <div class="unselect card-text">
                  <h4 class="title pointer mb-1">
                    <router-link :to="{ path: `/product/${item.id}` }" class="text-reset">
                      {{ item.title }}
                    </router-link>
                  </h4>
                  <div class="price-container">
                    <span class="price me-2">NT$&nbsp;{{ item.price }}</span>
                    <span class="price origin-price">NT$&nbsp;{{ item.origin_price }}</span>
                  </div>
                </div>
                <div class="pointer">
                  <i class="material-icons">bookmark_border</i>
                </div>
              </div>
            </div>
            <div class="card-wrapper rounded"></div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import AsideNavbar from '@/components/common/AsideNavbar.vue';
import SubNavbar from '@/components/common/SubNavbar.vue';

export default {
  components: {
    AsideNavbar,
    SubNavbar,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      productsAll: [],
      pagination: [],
      currentPage: 1,
      selectCategory: '',
    };
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      });
    },
    getAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url).then((res) => {
        this.productsAll = res.data.products;
        this.isLoading = false;
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
  grid-column-gap: 5em;
  @include lg {
    grid-template-columns: 1fr;
  }
  .aside-navbar {
    width: $aside-navbar-width;
    @include lg {
      width: initial;
    }
  }
  main {
    .product-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      @include xxl {
        grid-template-columns: repeat(3, 1fr);
      }
      @include md {
        grid-template-columns: repeat(2, 1fr);
      }
      .card {
        border: none;
        position: relative;
        .card-container {
          z-index: 2;
          .img-hover-zoom {
            overflow: hidden;
            img {
              transition: transform 350ms ease-in-out;
            }
          }
          .card-body {
            display: grid;
            grid-template-columns: 1fr 24px;
            grid-column-gap: 0.5em;
            padding: 1rem 0 0 0;

            @include md {
              padding: 0.5rem 0 0 0;
            }
            .card-text {
              display: flex;
              flex-direction: column;
              .title {
                font-size: 1rem;
                font-weight: 400;
                @include md {
                  font-size: 0.875rem;
                }
              }
              .price-container {
                @include sm {
                  display: flex;
                  flex-direction: column;
                }
                .price {
                  display: inline-block;
                  font-size: 0.875rem;
                  font-weight: 700;
                  @include md {
                    font-size: 0.75rem;
                  }
                }
                .origin-price {
                  font-weight: 400;
                  color: $gray-500;
                  text-decoration: line-through;
                }
              }
            }
            .material-icons {
              color: $gray-500;
              transition: color 150ms ease-in-out;
              &:hover {
                color: $color-main;
              }
            }
          }
          &:hover ~ .card-wrapper {
            z-index: 1;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
          &:hover .card-img-top {
            transform: scale(1.02);
          }
        }
        .card-wrapper {
          transition: box-shadow 150ms ease-in-out;
          position: absolute;
          z-index: -1;
          width: calc(100% + 2rem);
          height: calc(100% + 2rem);
          top: -1rem;
          left: -1rem;
          &:hover {
            z-index: 1;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
        }
      }
    }
  }
}
</style>
