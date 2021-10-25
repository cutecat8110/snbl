<template>
  <div class="home-container">
    <div class="order-information-wrapper">
      <a
        class="btn order-btn w-100"
        data-bs-toggle="collapse"
        href="#order-information"
        role="button"
        aria-expanded="false"
        aria-controls="order-information"
        @click="orderInfor = !orderInfor"
      >
        <div>合計&nbsp;NT$&nbsp;{{ $filters.currency(cart.final_total + conveyanceCost) }}</div>
        <div>
          購物清單 ({{ qty }})
          <i class="fas fa-caret-up" v-if="orderInfor"></i>
          <i class="fas fa-caret-down" v-if="!orderInfor"></i>
        </div>
      </a>
      <div class="collapse" id="order-information">
        <div class="web">
          <div class="list-head">
            <div>商品</div>
            <div></div>
            <div>數量</div>
            <div>單價</div>
            <div>小計</div>
          </div>
          <div class="list-card" v-for="item in showCart" :key="item.id">
            <!-- 商品資訊 -->
            <img class="img-fluid rounded" :src="item.product.imageUrl" />
            <div class="product-infor">
              <div class="title">{{ item.product.title }}</div>
              <div class="color"><span> COLOR : &nbsp;</span>{{ item.selected[0].color }}</div>
              <div class="size"><span>SIZE : &nbsp;</span>{{ item.selected[0].size }}</div>
            </div>
            <!-- 數量 -->
            <div class="align-box">
              {{ item.selected[0].qty }}
            </div>
            <!-- 售價 -->
            <div class="align-box">
              {{ $filters.currency(item.product.price) }}
            </div>
            <!-- 小計 -->
            <div class="align-box">
              {{ $filters.currency(item.product.price * item.selected[0].qty) }}
            </div>
          </div>
        </div>
        <div class="mobile">
          <div class="list-card" v-for="item in showCart" :key="item.id">
            <!-- 商品圖 -->
            <div class="img-box">
              <img class="img-fluid rounded" :src="item.product.imageUrl" />
            </div>
            <!-- 商品資訊 -->
            <div class="product-infor">
              <div class="title">
                {{ item.product.title }}
              </div>
              <div class="infor-text"><span> COLOR : &nbsp;</span>{{ item.selected[0].color }}</div>
              <div class="infor-text"><span>SIZE : &nbsp;</span>{{ item.selected[0].size }}</div>
            </div>
            <!-- 數量 -->
            <div class="qty-box">數量&nbsp;x&nbsp;{{ item.selected[0].qty }}</div>
            <!-- 價格-->
            <div class="product-price">
              <div class="price-text">
                <span>單價 &nbsp;</span>
                {{ $filters.currency(item.product.price) }}
              </div>
              <div class="price-text">
                <span>小計 &nbsp;</span>
                {{ $filters.currency(item.product.price * item.selected[0].qty) }}
              </div>
            </div>
          </div>
        </div>
        <div class="order-price">
          <div class="item-wrapper">
            <div class="item-body">
              <!-- 運送區域 -->
              <div class="text-content">
                <div class="oder-text">
                  <span class="text-name">總數量</span>
                  <span class="text-oder"> {{ qty }} 件</span>
                </div>
                <div class="oder-text">
                  <span class="text-name">商品小計</span>
                  <span class="text-oder">{{ $filters.currency(cart.total) }} </span>
                </div>
                <div class="oder-text">
                  <span class="text-name">運費</span>
                  <span class="text-oder">
                    {{ isNaN(conveyanceCost) ? '' : '+&nbsp;' }}
                    {{ conveyanceCost }}
                  </span>
                </div>
                <div class="oder-text">
                  <span class="text-name">優惠代碼</span>
                  <span class="text-oder">
                    -&nbsp;{{ $filters.currency(cart.total - cart.final_total) }}
                  </span>
                </div>
              </div>
              <div class="total">
                <div class="oder-text">
                  <span class="text-name">合計</span>
                  <span class="text-oder">
                    NT$&nbsp;{{ $filters.currency(cart.final_total + conveyanceCost) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          class="btn order-btn w-100"
          data-bs-toggle="collapse"
          href="#order-information"
          role="button"
          aria-expanded="false"
          aria-controls="order-information"
          @click="orderInfor = !orderInfor"
        >
          <i class="fas fa-caret-up" v-if="orderInfor"></i>
          <i class="fas fa-caret-down" v-if="!orderInfor"></i>
        </a>
      </div>
    </div>
    <Form ref="form" v-slot="{ errors }" @submit="createOrder">
      <div>
        客戶資料
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          ></Field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="ex.0980353064"
            rules="required|min:8"
            v-model="form.user.tel"
          ></Field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      orderInfor: false,
      qty: 0,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: {
          payment: {},
          message: '',
        },
      },
      cart: {},
      showCart: [],
      tempShowCart: [],
      conveyanceCost: '',
    };
  },
  methods: {
    createOrder() {
      this.emitter.emit('emitCreateOrder', this.form);
    },
  },
  created() {
    this.emitter.on('emitToAdd', (item) => {
      this.form.message.payment = JSON.parse(JSON.stringify(item[0]));
      this.conveyanceCost = JSON.parse(JSON.stringify(item[1]));
    });
    this.emitter.emit('upDatePayment');
    this.emitter.on('upDateCart', (item) => {
      this.cart = JSON.parse(JSON.stringify(item[0]));
      this.showCart = JSON.parse(JSON.stringify(item[1]));
      this.tempShowCart = JSON.parse(JSON.stringify(item[2]));
    });
    this.emitter.on('upDateQty', (qty) => {
      this.qty = qty;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.order-information-wrapper {
  border: 1px solid $gray-250;
  border-radius: 0.25rem;

  .order-btn {
    font-weight: 500;
    @include font-xl;

    transition: box-shadow 150ms ease-in-out, color 150ms ease-in-out;

    &:focus {
      box-shadow: none;
    }

    &:hover {
      color: $gray-600;
    }

    &:active {
      color: $gray-900;
      box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
    }

    div {
      &:last-child {
        font-weight: 400;
        @include font-lg;
      }
    }
  }

  .web {
    @include sm {
      display: none;
    }

    .list-head,
    .list-card {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 10rem 3fr 10rem 1fr 1fr;
    }

    .list-head {
      border-top: 1px solid $gray-250;
      border-bottom: 1px solid $gray-250;
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
      border-bottom: 1px solid $gray-250;
      padding: 1rem;

      transition: border 150ms ease-in-out;

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

      .align-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .mobile {
    display: none;

    @include sm {
      display: grid;

      border-top: 1px solid $gray-250;
    }

    .list-card {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 8rem 1fr 5rem;

      border-bottom: 1px solid $gray-250;
      padding: 1rem;
      @include xs {
        grid-gap: 0.5rem;
        grid-template-columns: 8rem 1fr;
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

        @include xs {
          grid-column-end: 3;
        }

        .title {
          margin-bottom: 1rem;
          font-weight: 500;
          white-space: normal;
          @include font-md;
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
        flex-direction: column;
        justify-content: flex-end;
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

  .order-price {
    display: grid;
    grid-gap: 2.5rem;
    grid-template-columns: 3fr 2fr;

    border-bottom: 1px solid $gray-250;
    @include lg {
      grid-template-columns: 1fr 1fr;
    }
    @include md {
      grid-template-columns: 1fr 2fr;
    }
    @include sm {
      grid-template-columns: 1fr;
    }

    .item-wrapper {
      grid-column-start: 2;
      grid-column-end: 3;

      @include sm {
        grid-column-start: 1;
        grid-column-end: 2;
      }

      .item-body {
        padding: 1rem;
        color: $gray-600;

        .text-content,
        .total {
          .oder-text {
            display: flex;
            justify-content: space-between;

            margin-bottom: 0.125rem;

            .text-oder {
              font-weight: 500;
              color: $gray-900;
            }
          }
        }

        .total {
          margin-bottom: 0;

          .oder-text {
            align-items: baseline;

            .text-oder {
              @include font-lg;
            }
          }
        }
      }
    }
  }
}

form {
  display: grid;
  grid-gap: 2.5rem;
  grid-template-columns: repeat(2, 1fr);
}
</style>
