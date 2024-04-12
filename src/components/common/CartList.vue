<template>
  <section>
    <template v-if="cart.carts">
      <div class="web">
        <div class="list-head">
          <div>商品</div>
          <div></div>
          <div>數量</div>
          <div>單價</div>
          <div>小計</div>
          <div></div>
        </div>
        <div v-for="(item, index) in showCart" :key="item.id" class="list-card">
          <!-- 商品資訊 -->
          <img class="img-fluid rounded" :src="item.product.imageUrl" />
          <div class="product-infor">
            <div class="title">{{ item.product.title }}</div>
            <div class="color"><span> COLOR : &nbsp;</span>{{ item.selected[0].color }}</div>
            <div class="size"><span>SIZE : &nbsp;</span>{{ item.selected[0].size }}</div>
          </div>
          <!-- 數量 -->
          <div class="align-box">
            <div class="qty input-group border rounded">
              <div>
                <button
                  :class="{ disabled: item.selected[0].qty <= 1 }"
                  class="qty-btn btn"
                  type="button"
                  :disabled="item.selected[0].qty <= 1"
                  @mouseup="item.selected[0].qty--, this.upDate(index, item.id, item.selected[0])"
                >
                  <i class="material-icons md-dark">remove</i>
                </button>
              </div>
              <input
                v-model="item.selected[0].qty"
                class="form-control text-center shadow-none rounded"
                type="text"
                :max="max"
                :min="min"
                @blur="makeUp(index), this.upDate(index, item.id, item.selected[0])"
                @input="handleInput(index, $event)"
              />
              <div>
                <button
                  :class="{ disabled: item.selected[0].qty >= 99 }"
                  class="qty-btn btn"
                  type="button"
                  :disabled="item.selected[0].qty >= 99"
                  @mouseup="item.selected[0].qty++, this.upDate(index, item.id, item.selected[0])"
                >
                  <i class="material-icons md-dark">add</i>
                </button>
              </div>
            </div>
          </div>
          <!-- 售價 -->
          <div class="align-box">
            {{ $filters.currency(item.product.price) }}
          </div>
          <!-- 小計 -->
          <div class="align-box">
            {{ $filters.currency(item.product.price * item.selected[0].qty) }}
          </div>
          <!-- 刪除 -->
          <div class="align-box">
            <button class="btn delCart" @click.prevent="delCart(item.id, item.selected[0])">
              <i class="material-icons md-dark">close</i>
            </button>
          </div>
        </div>
      </div>
      <div class="mobile">
        <div v-for="(item, index) in showCart" :key="item.id" class="list-card">
          <!-- 商品圖 -->
          <div class="img-box">
            <img class="img-fluid rounded" :src="item.product.imageUrl" />
          </div>

          <div class="product-infor">
            <!-- 品名 -->
            <div class="title">
              {{ item.product.title }}
              <!-- 刪除 -->
              <div class="del-box">
                <button class="btn delCart" @click.prevent="delCart(item.id, item.selected[0])">
                  <i class="material-icons md-dark">close</i>
                </button>
              </div>
            </div>
            <!-- 規格 -->
            <div class="infor-text"><span> COLOR : &nbsp;</span>{{ item.selected[0].color }}</div>
            <div class="infor-text"><span>SIZE : &nbsp;</span>{{ item.selected[0].size }}</div>
          </div>
          <!-- 數量 -->
          <div class="qty-box">
            <div class="qty input-group border rounded">
              <div>
                <button
                  :class="{ disabled: item.selected[0].qty <= 1 }"
                  class="qty-btn btn"
                  type="button"
                  :disabled="item.selected[0].qty <= 1"
                  @mouseup="item.selected[0].qty--, this.upDate(index, item.id, item.selected[0])"
                >
                  <i class="material-icons md-dark">remove</i>
                </button>
              </div>
              <input
                v-model="item.selected[0].qty"
                class="form-control text-center shadow-none rounded border-0"
                type="text"
                :max="max"
                :min="min"
                @blur="makeUp(index), this.upDate(index, item.id, item.selected[0])"
                @input="handleInput(index, $event)"
              />
              <div>
                <button
                  :class="{ disabled: item.selected[0].qty >= 99 }"
                  class="qty-btn btn"
                  type="button"
                  :disabled="item.selected[0].qty >= 99"
                  @mouseup="item.selected[0].qty++, this.upDate(index, item.id, item.selected[0])"
                >
                  <i class="material-icons md-dark">add</i>
                </button>
              </div>
            </div>
          </div>

          <div class="product-price">
            <!-- 單價-->
            <div class="price-text">
              <span>單價 &nbsp;</span>
              {{ $filters.currency(item.product.price) }}
            </div>
            <!-- 小計 -->
            <div class="price-text">
              <span>小計 &nbsp;</span>
              {{ $filters.currency(item.product.price * item.selected[0].qty) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      cart: {},
      selected: {},
      qty: 0,
      min: 1,
      max: 99,
      showCart: [],
      tempShowCart: []
    }
  },
  methods: {
    delCart(id, selected) {
      this.emitter.emit('emitDelCart', [id, selected])
    },
    handleInput(index, e) {
      if (e.target.value.replace(/[^\d]/g, '') !== '') {
        const inputQty = e.target.value.replace(/[^\d]/g, '')
        if (inputQty > this.max) {
          this.showCart[index].selected[0].qty = this.max
        } else if (inputQty < this.min) {
          this.showCart[index].selected[0].qty.qty = this.min
        } else {
          this.showCart[index].selected[0].qty = Number(e.target.value.replace(/[^\d]/g, ''))
        }
      } else {
        this.showCart[index].selected[0].qty = e.target.value.replace(/[^\d]/g, '')
      }
    },
    makeUp(index) {
      if (this.showCart[index].selected[0].qty === '') {
        this.showCart[index].selected[0].qty = 1
      }
    },
    upDate(index, id, selected) {
      if (this.showCart[index].selected[0].qty !== this.tempShowCart[index].selected[0].qty) {
        this.emitter.emit('emitUpDate', [index, id, selected])
      }
    }
  },
  created() {
    this.emitter.on('upDateCart', (item) => {
      this.cart = JSON.parse(JSON.stringify(item[0]))
      this.showCart = JSON.parse(JSON.stringify(item[1]))
      this.tempShowCart = JSON.parse(JSON.stringify(item[2]))
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

section {
  .web {
    border: 1px solid $gray-250;
    border-radius: 0.25rem;
    @include sm {
      display: none;
    }

    .list-head,
    .list-card {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 10rem 3fr 10rem 1fr 1fr 2.875rem;
    }

    .list-head {
      border-radius: 0.25rem;
      padding: 0.25rem 1rem;

      & > div {
        text-align: center;
      }
    }

    .list-card {
      position: relative;

      margin: -1px;
      border: 1px solid transparent;
      padding: 1rem;

      transition: border 150ms ease-in-out;

      &::after {
        content: '';
        position: absolute;
        z-index: -1;
        top: -1px;
        left: 0;

        width: 100%;
        height: 1px;
        background: $gray-250;
      }

      &:last-child {
        border-radius: 0 0 0.25rem 0.25rem;
      }

      .product-infor {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          margin-bottom: 0.5rem;
          font-weight: 500;
          white-space: normal;
          @include font-md;
        }

        .color,
        .size {
          font-weight: 500;
          color: $gray-600;
          @include font-sm;

          span {
            font-weight: 400;
          }
        }

        .color {
          margin-bottom: 0.125rem;
        }
      }

      .qty {
        background: $gray-250;

        .qty-btn {
          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0.375rem;

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

          &.disabled {
            opacity: 0.38;

            pointer-events: none;
          }
        }

        input {
          margin: 0 0.25rem !important;
          border: 0;
          padding: 0.375rem;
          background: $gray-250;
        }
      }

      .align-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .delCart {
        padding: 0.375rem;
        line-height: 0;
        opacity: 0;
        transform: translateX(0.125rem);

        transition:
          opacity 300ms ease-in-out,
          transform 300ms ease-in-out,
          box-shadow 150ms ease-in-out;

        .material-icons {
          color: rgba(0, 0, 0, 0.54);

          transition: color 150ms ease-in-out;

          &:hover {
            color: rgba(0, 0, 0, 0.65);
          }

          &:active {
            color: rgba(0, 0, 0, 0.74);
          }
        }

        &:focus {
          box-shadow: none;
        }

        &:active {
          box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
        }
      }

      &:hover {
        border: 1px solid $color-border-active;

        .delCart {
          opacity: 1;
          transform: translateX(-0.125rem);
        }
      }
    }
  }

  .mobile {
    display: none;

    border: 1px solid $gray-250;
    border-radius: 0.25rem;
    @include sm {
      display: grid;
    }

    .list-card {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 8rem 1fr 5rem;

      padding: 1rem;
      @include xs {
        grid-gap: 0.5rem;
        grid-template-columns: 8rem 1fr;
      }

      &:not(:last-child) {
        border-bottom: 1px solid $gray-250;
      }

      .img-box {
        display: flex;
        align-items: center;
        grid-row-start: 1;
        grid-row-end: 3;

        @include xs {
          align-items: flex-start;
          grid-row-end: 2;
        }
      }

      .product-infor {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 2;
        grid-column-end: 4;

        .title {
          display: flex;
          justify-content: space-between;

          margin-bottom: 0.5rem;
          font-weight: 500;
          white-space: normal;
          @include font-md;

          .delCart {
            margin: -0.375rem;
            padding: 0.375rem;
            line-height: 0;

            transition: box-shadow 150ms ease-in-out;

            .material-icons {
              color: rgba(0, 0, 0, 0.54);

              transition: color 150ms ease-in-out;

              &:hover {
                color: rgba(0, 0, 0, 0.65);
              }

              &:active {
                color: rgba(0, 0, 0, 0.74);
              }
            }

            &:focus {
              box-shadow: none;
            }

            &:active {
              box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
            }
          }
        }

        .infor-text {
          font-weight: 500;
          color: $gray-600;
          @include font-sm;

          span {
            font-weight: 400;
          }
        }
      }

      .qty-box {
        display: flex;
        align-items: flex-end;

        .qty {
          max-width: 10rem;
          background: $gray-250;

          .qty-btn {
            display: flex;
            align-items: center;
            justify-content: center;

            padding: 0.375rem;

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

            &.disabled {
              opacity: 0.38;

              pointer-events: none;
            }
          }

          input {
            margin: 0 0.25rem !important;
            border: 0;
            padding: 0.375rem;
            background: $gray-250;
          }
        }
      }

      .product-price {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        grid-row-start: 1;
        grid-row-end: 3;
        grid-column-start: 3;
        grid-column-end: 4;

        @include xs {
          grid-row-start: 2;
          grid-row-end: 3;
          grid-column-start: 2;
          grid-column-end: 3;
        }

        .price-text {
          display: flex;
          justify-content: space-between;

          span {
            color: $gray-600;
          }
        }
      }
    }
  }
}
</style>
