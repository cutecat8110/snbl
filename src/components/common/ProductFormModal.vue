<template>
  <div
    id="ProductFormModal"
    ref="modal"
    class="modal fade"
    aria-hidden="true"
    aria-labelledby="ProductFormModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog fixed-bottom">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header border-0">
          <button
            class="btn-close btn-close-white"
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="product">
              <div class="product-text">
                <h1>{{ product.title }}</h1>
                <!-- 價格 -->
                <div class="price">
                  <span class="me-2">NT$&nbsp;{{ $filters.currency(product.price) }}</span>
                  <span v-if="!(product.price == product.origin_price)" class="origin-price">
                    NT$&nbsp;{{ $filters.currency(product.origin_price) }}
                  </span>
                </div>
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
                        <div
                          class="h-28 w-28 rounded"
                          :style="{ backgroundColor: item.colorChart }"
                        ></div>
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
              </div>
              <img class="img-fluid img-thumbnail rounded" :src="product.imageUrl" />
            </div>

            <!-- 數量 -->
            <div class="product-oder">
              <div class="qty input-group bg-light border flex-nowrap rounded">
                <div>
                  <button
                    class="qty-btn btn"
                    type="button"
                    :disabled="qty === 1"
                    @mousedown="qty--"
                  >
                    <i class="material-icons md-dark">remove</i>
                  </button>
                </div>
                <input
                  v-model.number="qty"
                  class="form-control border-0 text-center bg-light shadow-none"
                  type="text"
                  :max="max"
                  :min="min"
                  @blur="makeUp"
                  @input="handleInput"
                />
                <div>
                  <button
                    class="qty-btn btn"
                    type="button"
                    :disabled="qty === 99"
                    @mousedown="qty++"
                  >
                    <i class="material-icons md-dark">add</i>
                  </button>
                </div>
              </div>
              <div v-if="!selected.color" class="btn cursor prompt d-block">請選擇顏色</div>
              <div v-else-if="!selected.size" class="btn cursor prompt d-block">請選擇尺寸</div>
              <a
                v-else
                class="btn add-cart d-block"
                href="#"
                @click.prevent="$emit('addToCart', true)"
                >加入購物車
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  props: ['product', 'tempSelected', 'tempQty'],
  data() {
    return {
      selected: {
        color: '',
        size: ''
      },
      qty: 1,
      min: 0,
      max: 99
    }
  },
  watch: {
    tempQty() {
      this.qty = this.tempQty
    },
    qty() {
      if (this.qty > this.max) {
        this.qty = this.max
      } else if (this.qty < this.min) {
        this.qty = this.min
      }
      this.$emit('getQty', this.qty)
    }
  },
  methods: {
    handleInput(e) {
      this.qty = e.target.value.replace(/[^\d]/g, '')
    },
    makeUp() {
      if (this.qty === '') {
        this.qty = 1
      }
    }
  },
  mounted() {
    this.selected = this.tempSelected
    this.qty = this.tempQty
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

#ProductFormModal {
  .modal-dialog {
    width: auto;
    max-width: none;
    margin: 0;
    .modal-content {
      background: none;
      .modal-body {
        padding: 1.5rem 0;
        background: #fff;
        .product {
          display: grid;
          grid-template-columns: 1fr 200px;
          grid-gap: 1.25rem;
          @include xs {
            grid-template-columns: 1fr 1fr;
            grid-gap: 1rem;
          }
          .product-text {
            @include xs {
              grid-column-start: 1;
              grid-column-end: 3;
              grid-row-start: 2;
              grid-row-end: 3;
            }
            h1 {
              @include font-xl;
              margin-bottom: 0.25rem;
              @include xs {
                @include font-lg;
              }
            }
            .price {
              @include font-lg;
              margin-bottom: 0.5rem;
              font-weight: 500;
              @include xs {
                @include font-md;
              }
              .origin-price {
                font-weight: 300;
                color: $gray-500;
                text-decoration: line-through;
              }
            }
            .color-container {
              margin-bottom: 0.5rem;
            }
            .size-container,
            .color-container {
              .form-label {
                @include font-sm;
                margin-bottom: 0.25rem;
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
          }
          .img-fluid {
            @include xs {
              grid-column-start: 1;
              grid-column-end: 2;
              grid-row-start: 1;
              grid-row-end: 2;
            }
          }
        }
        .product-oder {
          margin-top: 1rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1.25rem;
          @include xs {
            grid-template-columns: 1fr;
            grid-gap: 0.5rem;
          }
          .qty {
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
            background: #fff;
            border: 1px solid $gray-250;
          }
          .add-cart {
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
        }
      }
    }
  }
}
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, 50px);
}
.modal.show .modal-dialog {
  transform: none;
}
</style>
