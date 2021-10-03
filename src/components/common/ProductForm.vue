<template>
  <section>
    <div class="product-form-container">
      <!-- 商品名稱 -->
      <h1 class="mb-3 product-title">{{ product.title }}</h1>
      <!-- 價目 -->
      <div class="fs-2 d-flex align-items-center">
        <span class="me-3">NT$&nbsp;{{ product.price }}</span>
        <span
          v-if="!(product.price == product.origin_price)"
          class="origin-price text-decoration-line-through"
        >
          NT$&nbsp;{{ product.origin_price }}
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
          @click.prevent="$emit('subNav', 'modelImagesUrl')"
          >模特展示</a
        >
        <span>｜</span>
        <a
          href="#"
          class="fs-6 btn p-0 shadow-none active-box-shadow text-decoration-underline"
          @click.prevent="$emit('subNav', 'detalImagesUrl')"
          >細節展示</a
        >
        <span>｜</span>
        <a
          href="#"
          class="fs-6 btn p-0 shadow-none active-box-shadow text-decoration-underline"
          @click.prevent="$emit('subNav', 'infolImageUrl')"
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
              <div class="h-28 w-28 rounded" :style="{ backgroundColor: item.colorChart }"></div>
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
            @click.prevent="console.log(123)"
            >加入購物車
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
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
    handleInput(e) {
      this.qty = e.target.value.replace(/[^\d]/g, '');
    },
    makeUp() {
      if (this.qty === '') {
        this.qty = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

section {
  position: fixed;
  width: $product-form-width;
  z-index: 1030;
  @include lg {
    display: none;
    width: 100%;
    border-top: 1px solid #656565;
    background: #fff;
    bottom: 0;
    left: 0;
  }
  .product-form-container {
    @include lg {
      width: 720px;
      margin: 0 auto;
    }
  }
}

.product-title {
  font-size: 1.5rem;
  letter-spacing: -0.075em;
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
