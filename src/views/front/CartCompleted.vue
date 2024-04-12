<template>
  <div class="container py-4">
    <CartProcess></CartProcess>
    <div v-if="Object.keys(order).length !== 0">
      <main>
        <div class="scenery" :style="{ backgroundImage: 'url(' + scenery + ')' }"></div>
        <div class="completed-container">
          <div class="order-header">
            <h1>訂單明細</h1>
            <div :class="{ active: order.is_paid }" class="state">
              <span class="number">編號 : &nbsp;{{ orderId.substr(1) }}</span>
              <div class="gap"></div>
              {{ order.is_paid ? '付款完成' : '待付款' }}
            </div>
          </div>
          <div class="completed">
            <div class="item-wrapper detail">
              <h2>商品明細</h2>
              <div class="item-body">
                <div class="order-card">
                  <div v-for="(item, index) in products" :key="index" class="order-list">
                    <div class="img-box">
                      <img class="img-fluid rounded" :src="item.product.imageUrl" />
                    </div>
                    <div class="card-text">
                      <div class="product-title">{{ item.product.title }}</div>
                      <div class="color-size">
                        {{ item.selected[0].color }}&nbsp;{{ item.selected[0].size }}
                      </div>
                    </div>
                    <div class="price">
                      {{ item.selected[0].qty }}&nbsp;x&nbsp; NT$&nbsp;{{ item.product.price }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <h2>訂購人信息</h2>
              <div class="item-body">
                <div class="item-group">
                  <span>{{ order.user.name }}</span>
                </div>
                <div class="item-group">
                  {{ order.user.tel }}
                  <br />
                  {{ order.user.email }}
                  <br />
                  {{ order.user.address }}
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <h2>收件信息</h2>
              <div class="item-body">
                <div class="item-group">
                  <span>{{ order.message.recipient.name }}</span>
                  <br />
                  {{ order.message.recipient.tel }}
                </div>
                <template v-if="order.message.payment.conveyance == '7-11 超商取貨'">
                  <div class="item-group">
                    <span>{{ order.message.payment.conveyance }}</span>
                    <br />
                    全家台中忠孝夜店&nbsp;F010256
                    <br />
                    台中市南區忠孝路102號
                  </div>
                </template>
                <template v-else-if="order.message.payment.conveyance == '全家 超商取貨'">
                  <div class="item-group">
                    <span>{{ order.message.payment.conveyance }}</span>
                    <br />
                    民生門市&nbsp;186700
                    <br />
                    台中市南區復興路三段322號324號326號
                  </div>
                </template>
                <template v-else>
                  <div class="item-group">
                    <span>{{ order.message.payment.conveyance }}</span>
                    <br />
                    {{ order.message.recipient.address }}
                    {{ order.message.recipient.timePeriod }}
                  </div>
                </template>
              </div>
            </div>
            <div v-if="order.message.message" class="item-wrapper">
              <h2>備註</h2>
              <div class="item-body">
                <div class="item-group">
                  <span>{{ order.message.message }}</span>
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <h2>付款方式</h2>
              <div class="item-body">
                <div class="item-group">
                  <span>{{ order.message.payment.method }}</span>
                </div>
              </div>
            </div>
            <div class="order-foot">
              <div class="d-flex align-items-center">
                <router-link class="text-reset" to="/products">
                  <i class="fas fa-arrow-left"></i>
                  繼續購物
                </router-link>
              </div>
              <button
                :class="{
                  active:
                    order.is_paid ||
                    order.message.payment.method == '超商取貨付款 (COD)' ||
                    order.message.payment.method == '貨到付款(COD)(+NT$30)'
                }"
                class="btn w-100 checkout"
                type="button"
                @click.prevent="payment"
              >
                {{
                  order.is_paid ||
                  order.message.payment.method == '超商取貨付款 (COD)' ||
                  order.message.payment.method == '貨到付款(COD)(+NT$30)'
                    ? '訂單完成'
                    : '立即付款'
                }}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import CartProcess from '@/components/common/CartProcess.vue'

export default {
  inject: ['emitter'],
  components: {
    CartProcess
  },
  data() {
    return {
      orderId: '',
      order: {},
      productsAll: {}
    }
  },
  computed: {
    products() {
      const show = []
      const products = Object.keys(this.order.products).map((key) => ({
        [key]: this.order.products[key]
      }))
      products.forEach((tempItem) => {
        const item = Object.entries(tempItem)[0][1]
        if (item.selected.length === 1) {
          show.push(item)
        } else {
          for (let i = 0; i < item.selected.length; i += 1) {
            const tempProduct = JSON.parse(JSON.stringify(item))
            const singleSelected = [tempProduct.selected[i]]
            delete tempProduct.selected
            tempProduct.selected = singleSelected
            show.push(tempProduct)
          }
        }
      })
      return show
    },
    qty() {
      let qty = 0
      this.products.forEach((item) => {
        qty += item.selected[0].qty
      })
      return qty
    },
    scenery() {
      function getRandomInt(max) {
        return Math.floor(Math.random() * max)
      }
      const num = getRandomInt(this.productsAll.length)
      const scenery = this.productsAll[num].imageUrl
      return scenery
    }
  },
  methods: {
    getOrder() {
      this.emitter.emit('isLoading', true)
      const { id } = this.$route.params
      this.orderId = id

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(url).then((res) => {
        this.order = res.data.order
        this.emitter.emit('isLoading', false)
      })
    },
    getAll() {
      this.emitter.emit('isLoading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        this.productsAll = res.data.products
        this.emitter.emit('isLoading', false)
      })
    },
    payment() {
      this.emitter.emit('isLoading', true)
      const { id } = this.$route.params
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`
      this.$http.post(url).then(() => {
        this.getOrder()
        this.emitter.emit('isLoading', false)
        this.$swal({
          icon: 'success',
          title: '付款成功',
          timer: 1500,
          showConfirmButton: false
        })
      })
    }
  },
  created() {
    this.getOrder()
    this.getAll()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.container {
  display: grid;
  flex: 1;
  grid-gap: 2.5rem;
  grid-template-rows: 6rem 1fr;

  @include sm {
    grid-gap: 1.5rem;
    grid-template-rows: 13.125rem 1fr;
  }

  main {
    display: grid;
    grid-gap: 2.5rem;
    grid-template-columns: 1fr 2fr;
    @include md {
      grid-template-columns: 1fr;
    }

    .scenery {
      border-radius: 0.25rem;
      background-position: center;
      background-size: cover;
      @include md {
        display: none;
      }
    }

    .completed-container {
      .order-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;

        margin-bottom: 1rem;

        h1 {
          display: flex;
          align-items: baseline;

          margin: 0;
          font-weight: 500;
          @include font-xl;
        }

        .state {
          display: flex;
          align-items: center;
          color: $color-main;
          @include font-sm;
          flex-wrap: 500;
          .number {
            color: $gray-600;
          }
          .gap {
            width: 1px;
            height: 0.7rem;
            margin: 0 0.5rem;
            background: rgba(0, 0, 0, 0.54);
            opacity: 0.38;
          }
          &.active {
            color: $color-aside;
          }
        }
        @include sm {
          flex-direction: column;
          h1 {
            margin-bottom: 0.5rem;
          }
        }
      }

      .completed {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: 1fr 1fr;
        @include md {
          grid-template-columns: 1fr;
          grid-gap: 1.5rem;
        }

        .item-wrapper {
          border: 1px solid $gray-250;
          border-radius: 0.25rem;

          &.detail {
            grid-column-start: 1;
            grid-column-end: 3;
            @include sm {
              grid-column-start: 1;
              grid-column-end: 2;
            }
          }
          h2 {
            margin: 0;
            padding: 0.25rem 1rem;
            font-weight: 500;
            line-height: 1.5;
            text-align: center;
            color: $gray-600;
            background: $gray-250;
            @include font-md;
          }

          .item-body {
            padding: 1rem;

            .order-card {
              display: grid;

              gap: 1rem;

              .order-list {
                display: grid;
                grid-template-columns: 4rem 1fr auto;

                column-gap: 1rem;
                .img-box {
                  display: flex;
                  align-items: center;
                }

                .card-text {
                  display: flex;
                  justify-content: center;
                  flex-direction: column;

                  .product-title {
                    font-weight: 500;
                    @include font-md;
                  }

                  .color-size {
                    color: $gray-600;
                    @include font-sm;
                  }
                }

                .price {
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;

                  font-weight: 500;
                  color: $gray-900;
                  @include font-sm;
                }
              }
            }

            .item-group {
              color: $gray-600;

              &:not(:last-child) {
                margin-bottom: 1rem;
              }

              span {
                font-weight: 500;
                color: $gray-900;
              }
            }
          }
        }

        .order-foot {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-column-start: 1;
          grid-column-end: 3;
          grid-gap: 4.5rem;
          @include md {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-template-columns: 1fr;
            grid-gap: 0;
            .d-flex {
              justify-content: center;
              margin-top: 1rem;
            }
            .checkout {
              grid-row-start: 1;
              grid-row-end: 2;
            }
          }

          border: 1px solid $gray-250;
          border-radius: 0.25rem;
          padding: 1rem;

          .checkout {
            color: #ffffff;
            background: $color-main;

            transition: background 150ms ease-in-out;

            &.active {
              background: $color-aside;
              flex-wrap: 500;
              pointer-events: none;
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

            &:active {
              box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
            }

            &:disabled {
              background: coral;
            }
          }

          .d-flex {
            color: $gray-600;

            .text-reset {
              transition: opacity 150ms ease-in-out;

              i {
                margin-right: 0.5rem;
              }

              &:hover {
                opacity: 0.7;
              }

              &:active {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
