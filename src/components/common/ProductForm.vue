<template>
  <section>
    <div class="web">
      <!-- 商品名稱 -->
      <div class="product-title">
        <h1>{{ product.title }}</h1>
        <a
          :class="{ active: myFavorite.includes(product.id) }"
          class="pointer"
          @click.prevent="emitUpDateMyFavorite(product.id)"
        >
          <i class="material-icons">
            {{ myFavorite.includes(product.id) ? 'bookmark' : 'bookmark_border' }}
          </i>
        </a>
      </div>
      <!-- 價格 -->
      <div class="price">
        <span class="me-2">NT$&nbsp;{{ $filters.currency(product.price) }}</span>
        <span v-if="!(product.price == product.origin_price)" class="origin-price">
          NT$&nbsp;{{ $filters.currency(product.origin_price) }}
        </span>
      </div>
      <!-- 新品/特價 -->
      <div v-if="product.origin_price == product.price" class="new-sale">NEW</div>
      <div v-else class="new-sale">SALE</div>
      <!-- 導航-->
      <nav>
        <a
          class="product-form-navbar-link"
          href="#"
          @click.prevent="$emit('subNav', 'modelImagesUrl')"
          >模特展示</a
        >
        <div class="vertical"></div>
        <a
          class="product-form-navbar-link"
          href="#"
          @click.prevent="$emit('subNav', 'detalImagesUrl')"
          >細節展示</a
        >
        <div class="vertical"></div>
        <a
          class="product-form-navbar-link"
          href="#"
          @click.prevent="$emit('subNav', 'infolImageUrl')"
          >商品信息</a
        >
      </nav>
      <!-- 顏色 -->
      <div class="color-container">
        <div class="form-label">COLOR : &nbsp;{{ selected.color }}</div>
        <div class="color">
          <label
            v-for="(item, index) in product.colors"
            :key="index"
            :class="selected.color === item.name ? 'active' : ''"
            class="pointer"
            :for="'colors' + index"
          >
            <input
              :id="'colors' + index"
              v-model="selected.color"
              class="d-none"
              type="radio"
              :value="item.name"
            />
            <div class="h-36 w-36 rounded selected-box">
              <div class="h-28 w-28 rounded" :style="{ backgroundColor: item.colorChart }"></div>
            </div>
          </label>
        </div>
      </div>
      <!-- 尺寸 -->
      <div class="size-container">
        <div class="form-label">SIZE : &nbsp;{{ selected.size.name }}</div>
        <div class="size">
          <label
            v-for="(item, index) in product.clothSize"
            :key="index"
            :class="selected.size === item ? 'active' : ''"
            class="pointer"
            :for="'clothSize' + index"
          >
            <input
              :id="'clothSize' + index"
              v-model="selected.size"
              class="d-none"
              type="radio"
              :value="item"
            />
            <div class="h-36 w-36 selected-box rounded">
              {{ item }}
            </div>
          </label>
        </div>
      </div>
      <!-- 數量 -->
      <div class="qty input-group bg-light border flex-nowrap rounded">
        <div>
          <button class="qty-btn btn" type="button" :disabled="qty <= 1" @mousedown="qty--">
            <i class="material-icons md-dark">remove</i>
          </button>
        </div>
        <input
          v-model.number="qty"
          class="form-control border-0 text-center bg-light shadow-none"
          type="text"
          :max="max"
          :min="min"
          @blur="makeUp(index)"
          @input="handleInput"
        />
        <div>
          <button class="qty-btn btn" type="button" :disabled="qty >= 99" @mousedown="qty++">
            <i class="material-icons md-dark">add</i>
          </button>
        </div>
      </div>
      <!-- 加入購物車/立即購買 -->
      <div v-if="!selected.color" class="btn cursor prompt d-block">請選擇顏色</div>
      <div v-else-if="!selected.size" class="btn cursor prompt d-block">請選擇尺寸</div>
      <a v-else class="btn add-cart d-block" href="#" @click.prevent="addToCart">加入購物車 </a>
      <!-- 分享 -->
      <div class="share-container">
        <div class="share-title">Show Us Your Style</div>
        <div class="share-text">標籤 #snbl 在你的 IG 貼文上，和我們分享你的森女穿搭吧！</div>
        <div class="share-link-container">
          <div class="share-link">
            <a class="facebook" href="#" @click.prevent="">
              <i class="fab fa-facebook-square"></i>
            </a>
          </div>
          <div class="share-link">
            <a class="line" href="#" @click.prevent="">
              <i class="fab fa-line"></i>
            </a>
          </div>
          <div class="share-link">
            <a class="twitter" href="#" @click.prevent="">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
          <div class="share-link">
            <a class="weibo" href="#" @click.prevent="">
              <i class="fab fa-weibo"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <a class="btn mobile rounded-0" href="#" @click.prevent="openModal">加入購物車 </a>
  </section>
  <ProductFormModal
    ref="ProductFormModal"
    :product="product"
    :tempQty="qty"
    :tempSelected="selected"
    @addToCart="addToCart"
    @getQty="getQty"
  ></ProductFormModal>
</template>

<script>
import ProductFormModal from '@/components/common/ProductFormModal.vue'

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
    ProductFormModal
  },
  inject: ['emitter'],
  props: ['product'],
  emits: ['subNav'],
  data() {
    return {
      selected: {
        color: '',
        size: ''
      },
      qty: 1,
      min: 0,
      max: 99,
      modal: false,
      myFavorite: sotrageMethods.get() || []
    }
  },
  watch: {
    qty() {
      if (this.qty > this.max) {
        this.qty = this.max
      } else if (this.qty < this.min) {
        this.qty = this.min
      }
    }
  },
  methods: {
    emitUpDateMyFavorite(id) {
      this.emitter.emit('emitUpDateMyFavorite', id)
    },
    handleInput(e) {
      this.qty = e.target.value.replace(/[^\d]/g, '')
    },
    makeUp() {
      if (this.qty === '') {
        this.qty = 1
      }
    },
    getQty(qty) {
      this.qty = qty
    },
    openModal() {
      this.$refs.ProductFormModal.openModal()
    },
    addToCart(modal = false) {
      this.modal = modal
      this.emitter.emit('emitToCart', {
        id: this.product.id,
        selected: this.selected,
        qty: this.qty
      })
    }
  },
  created() {
    this.emitter.on('getMyFavorite', () => {
      this.myFavorite = sotrageMethods.get()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

section {
  width: $product-form-width;
  position: fixed;
  z-index: 1030;

  @include md {
    width: 100%;
    left: 0;
    bottom: 0;
  }
  .web {
    padding-top: 3.5625rem;
    @include md {
      display: none;
    }
    .product-title {
      display: grid;
      grid-template-columns: 1fr 24px;
      grid-column-gap: 0.5rem;
      margin-bottom: 1.5rem;
      h1 {
        @include font-xl;
        margin: 0;
      }
      a {
        .material-icons {
          margin-top: 0.25rem;
          color: $gray-500;
          transition: color 150ms ease-in-out;
          &:hover {
            color: $color-main;
          }
          &:active {
            color: $color-main-active;
          }
        }
        &.active {
          .material-icons {
            color: $color-main;
            &:active {
              color: $color-main-active;
            }
          }
        }
      }
    }
    .price {
      @include font-lg;
      font-weight: 500;
      .origin-price {
        font-weight: 300;
        color: $gray-500;
        text-decoration: line-through;
      }
    }
    .new-sale {
      margin-bottom: 1.5rem;
      @include font-sm;
      display: inline-block;
      line-height: 1.2rem;
      color: #fff;
      background: $gray-900;
      padding: 0 0.25rem;
    }
    nav {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      .product-form-navbar-link {
        @include font-sm;
        color: $gray-600;
        text-decoration: underline;
        transition: color 150ms ease-in-out;
        &:hover {
          color: $gray-900;
        }
      }
      .vertical {
        width: 1px;
        height: 0.7rem;
        margin: 0 0.5rem;
        background: rgba(0, 0, 0, 0.54);
        opacity: 0.38;
      }
    }
    .size-container,
    .color-container {
      margin-bottom: 1rem;
      .form-label {
        @include font-sm;
      }
      .color,
      .size {
        label {
          &:not(:last-child) {
            margin-right: 16px;
          }
          &.active {
            .selected-box {
              border: 1px solid $color-border-active;
            }
          }
          .selected-box {
            border: 1px solid $gray-250;
            display: flex;
            align-items: center;
            justify-content: center;
            transition:
              border 150ms ease-in-out,
              box-shadow 150ms ease-in-out;
            &:hover {
              border: 1px solid $color-border-active;
            }
            &:active {
              box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
            }
          }
        }
      }
    }
    .qty {
      margin-bottom: 1rem;
      @include font-sm;

      .qty-btn {
        border: 1px solid transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: box-shadow 150ms ease-in-out;
        .md-dark {
          transition: color 150ms ease-in-out;
        }
        &:focus {
          box-shadow: none;
        }
        &:hover > .md-dark {
          color: rgba(0, 0, 0, 0.65);
        }
        &:active > .md-dark {
          color: rgba(0, 0, 0, 0.74);
        }
        &:active {
          box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
        }
      }
    }
    .prompt {
      margin-bottom: 1.5rem;

      background: #fff;
      border: 1px solid $gray-250;
    }
    .add-cart {
      margin-bottom: 1.5rem;

      color: #fff;
      background: $color-main;
      transition: box-shadow 150ms ease-in-out;
      &:hover {
        background: $color-main-hover;
      }
      &:focus {
        box-shadow: none;
      }
      &:active {
        background: $color-main-active;
        box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
      }
    }
    .share-container {
      color: $gray-600;

      @include font-sm;
      .share-title {
        margin-bottom: 0.25rem;
      }
      .share-text {
        font-weight: 300;
        margin-bottom: 1rem;
      }
      .share-link-container {
        display: flex;
        font-size: 1.125rem;
        .share-link {
          &:not(:last-child) {
            margin-right: 1rem;
          }
          width: 1.125rem;
          height: 1.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.25rem;
          transition: box-shadow 150ms ease-in-out;
        }
        a {
          color: rgba(0, 0, 0, 0.54);
          :hover {
            color: rgba(0, 0, 0, 0.65);
          }
          :active {
            color: rgba(0, 0, 0, 0.74);
          }
          i {
            transition: color 150ms ease-in-out;
          }
        }
      }
    }
  }
  .mobile {
    display: none;
    color: #fff;
    background: $color-main;
    transition: background 150ms ease-in-out;

    @include md {
      display: block;
    }
    &:hover {
      background: $color-main-hover;
    }
    &:active {
      background: $color-main-active;
    }

    &:focus {
      box-shadow: none;
    }
  }
}
</style>
