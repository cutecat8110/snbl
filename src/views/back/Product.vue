<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="container py-4">
    <div class="position-relative">
      <div class="aside-navbar position-fixed">
        <AsideNavbar></AsideNavbar>
      </div>
    </div>
    <main>
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
      <div class="position-relative">
        <div class="product-order position-fixed">
          <!-- 商品名稱 -->
          <h1 class="mb-3 product-title">{{ product.title }}</h1>
          <!-- 價目 -->
          <div class="fs-2 d-flex align-items-center">
            <span class="me-3">NT$&nbsp;{{ $filters.currency(product.price) }}</span>
            <span
              v-if="!(product.price == product.origin_price)"
              class="origin-price text-decoration-line-through"
            >
              NT$&nbsp;{{ $filters.currency(product.origin_price) }}
            </span>
          </div>
          <div>
            <span v-if="product.origin_price == product.price" class="bg-dark text-white px-1 fs-6">
              NEW
            </span>
            <span v-else class="bg-dark text-white px-1 fs-6">SALE</span>
          </div>
          <div class="mb-4">
            <a
              href="#"
              class="fs-6 btn p-0 shadow-none active-box-shadow text-decoration-underline"
              @click.prevent="subNav('modelImagesUrl')"
              >模特展示</a
            >
            <span>｜</span>
            <a
              href="#"
              class="fs-6 btn p-0 shadow-none active-box-shadow text-decoration-underline"
              @click.prevent="subNav('detalImagesUrl')"
              >細節展示</a
            >
            <span>｜</span>
            <a
              href="#"
              class="fs-6 btn p-0 shadow-none active-box-shadow text-decoration-underline"
              @click.prevent="subNav('infolImageUrl')"
              >商品信息</a
            >
          </div>

          <!-- 顏色 -->
          <div class="mb-3">
            <div class="form-label fs-6">COLOR : &nbsp;{{ selected.color.name }}</div>
            <div class="color">
              <label
                v-for="(item, index) in product.colors"
                :key="index"
                :for="'colors' + index"
                class="pointer"
                :class="selected.color.name === item.name ? 'active' : ''"
              >
                <input
                  :id="'colors' + index"
                  class="d-none"
                  type="radio"
                  :value="item"
                  v-model="selected.color"
                />
                <div
                  class="h-36 w-36 selected-size-box rounded active-box-shadow
                    d-flex justify-content-center align-items-center"
                >
                  <div
                    class="h-28 w-28 rounded"
                    :style="{ backgroundColor: item.colorChart }"
                  ></div>
                </div>
              </label>
            </div>
          </div>
          <!-- 尺寸 -->
          <div class="mb-3">
            <div class="form-label fs-6">SIZE : &nbsp;{{ selected.name }}</div>
            <div class="size">
              <label
                v-for="(item, index) in product.clothSize"
                :key="index"
                :for="'clothSize' + index"
                class="pointer"
                :class="selected.name === item ? 'active' : ''"
              >
                <input
                  :id="'clothSize' + index"
                  class="d-none"
                  type="radio"
                  :value="item"
                  v-model="selected.name"
                />
                <div
                  class="h-36 w-36 selected-size-box rounded active-box-shadow
                    d-flex justify-content-center align-items-center"
                >
                  {{ item }}
                </div>
              </label>
            </div>
          </div>
          <!-- 數量 -->
          <div class="mb-3">
            <div class="d-flex align-items-center">
              <div class="qty input-group bg-light border flex-nowrap rounded">
                <div>
                  <button
                    class="qty-btn btn h-36 w-36 active-box-shadow
                    d-flex justify-content-center align-items-cente"
                    type="button"
                    @mousedown="qty--"
                    :disabled="qty === 1"
                  >
                    <i class="material-icons md-dark">remove</i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control border-0 text-center bg-light shadow-none"
                  :min="min"
                  :max="max"
                  @input="handleInput"
                  @blur="makeUp"
                  v-model.number="qty"
                />
                <div>
                  <button
                    class="qty-btn btn h-36 w-36 active-box-shadow
                    d-flex justify-content-center align-items-cente"
                    type="button"
                    @mousedown="qty++"
                    :disabled="qty === 99"
                  >
                    <i class="material-icons md-dark">add</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- 加入購物車/立即購買 -->
          <div class="row mb-4">
            <div class="col-12">
              <div
                v-if="!selected.color"
                class="text-nowrap text-center border cursor unselect rounded
                  shadow-none w-100 py-2"
              >
                請選擇顏色
              </div>
              <div
                v-else-if="!selected.name"
                class="text-nowrap text-center border cursor unselect rounded
                  shadow-none w-100 py-2"
              >
                請選擇尺寸
              </div>
              <a
                v-else
                href="#"
                class="add-cart text-white text-nowrap btn
                  shadow-none active-box-shadow w-100 py-2"
                >加入購物車
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ProductSwiper from '@/components/back/ProductSwiper.vue';
import AsideNavbar from '@/components/back/AsideNavbar.vue';

export default {
  components: { AsideNavbar, ProductSwiper },

  data() {
    return {
      isLoading: false,
      product: [],
      selected: {
        color: '',
        size: '',
      },
      qty: 1,
      min: 0,
      max: 99,
    };
  },
  watch: {
    qty() {
      if (this.qty > this.max) {
        this.qty = this.max;
      } else if (this.qty < this.min) {
        this.qty = this.min;
      }
    },
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
    handleInput(e) {
      this.qty = e.target.value.replace(/[^\d]/g, '');
    },
    makeUp() {
      if (this.qty === '') {
        this.qty = 1;
      }
    },
    subNav(item) {
      console.log(this.$refs[item].offsetTop);
      window.scrollTo(0, this.$refs[item].offsetTop - 56);
    },
  },
  created() {
    this.getProduct();
  },
  mounted() {
    document.querySelector('#dashboard').setAttribute('style', 'background:#FFFFFF');
  },
  beforeUnmount() {
    document.querySelector('#dashboard').removeAttribute('style');
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.container {
  display: grid;
  grid-template-columns: $aside-navbar-width 1fr;
  grid-column-gap: 5em;
  .aside-navbar {
    width: $aside-navbar-width;
  }
  main {
    display: grid;
    grid-template-columns: 1fr $product-form-width;
    grid-column-gap: 2.5em;
    .product {
      display: grid;
      grid-template-columns: 1fr;
      .mySwiper {
        width: 100%;
        height: 100%;
      }
      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .product-order {
      width: $product-form-width;
      .product-title {
        font-size: 1.5rem;
        letter-spacing: -0.075em;
      }
    }
  }
}

.origin-price {
  color: $gray-500;
}
.active-box-shadow {
  &:active {
    box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5) !important;
  }
}
.color,
.size {
  label:not(:last-child) {
    margin-right: 16px;
  }
  .active {
    .selected-size-box {
      border: 1px solid #656565;
    }
  }
  .selected-size-box {
    border: 1px solid $gray-250;
    &:hover {
      border: 1px solid #656565;
    }
  }
}
.qty {
  .qty-btn {
    border: 1px solid transparent;
    &:focus {
      box-shadow: none;
    }
    &:hover {
      border: 1px solid #656565;
    }
  }
}
.go-buy {
  border: 1px solid $gray-250;
}
.add-cart {
  background: $color-main;
  &:hover {
    background: $color-main-hover;
  }
  &:active {
    background: $color-main-active;
  }
}
</style>
