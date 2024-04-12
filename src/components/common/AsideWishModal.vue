<template>
  <div
    id="CartModal"
    ref="modal"
    class="modal fade"
    aria-hidden="true"
    aria-labelledby="CartModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header border-0">
          <h5 class="modal-title">願望清單</h5>
          <button
            class="btn-close"
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <template v-if="myFavoriteProducts.length > 0">
            <div v-for="item in myFavoriteProducts" :key="item.id" class="cart-card">
              <router-link
                class="text-reset"
                :to="{ path: `/product/${item.id}` }"
                @click="hideModal"
              >
                <img class="img-fluid rounded" :src="item.imageUrl" />
              </router-link>
              <div class="text-container cursor">
                <h4
                  class="product-title"
                  :title="item.title"
                  data-bs-placement="top"
                  data-bs-toggle="tooltip"
                >
                  <router-link
                    class="text-reset"
                    :to="{ path: `/product/${item.id}` }"
                    @click="hideModal"
                  >
                    {{ item.title }}
                  </router-link>
                </h4>
                <div class="price">
                  <span class="me-2">NT$&nbsp;{{ item.price }}</span>
                  <span v-if="item.price != item.origin_price" class="origin-price">
                    NT$&nbsp;{{ item.origin_price }}
                  </span>
                </div>
              </div>
              <div class="delCart-wrapper">
                <button class="btn delCart" @click.prevent="$emit('addMyFavorite', item.id)">
                  <i class="material-icons md-dark">close</i>
                </button>
                <router-link
                  class="btn shopping-link"
                  :to="{ path: `/product/${item.id}` }"
                  @click.prevent="hideModal"
                >
                  <i class="material-icons md-dark">shopping_cart</i>
                </router-link>
              </div>
            </div>
          </template>
          <div v-else class="nothing">
            <i class="material-icons md-48">bookmark</i>
            <div class="nothing-text">願望清單目前是空的</div>
            <router-link class="btn goshoping" to="/products" @click="hideModal">
              來去許願吧!
            </router-link>
          </div>
        </div>
        <div v-if="myFavoriteProducts.length > 0" class="modal-footer border-0">
          <div class="total">
            <span>願望數量&nbsp;{{ myFavoriteProducts.length }}</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import TooltipMixin from '@/mixins/TooltipMixin';

export default {
  mixins: [modalMixin, TooltipMixin],
  inject: ['emitter'],
  props: ['myFavoriteProducts']
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

#CartModal {
  .modal-dialog {
    height: 100%;
    width: 100%;
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
    .modal-content {
      height: 100%;
      .modal-header {
        padding: 1.5rem 1.5rem 0 1.5rem;
        .modal-title {
          @include font-lg;
        }
        .btn-close {
          &:focus {
            box-shadow: none;
            opacity: 0.5;
          }
          &:active {
            box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
          }
        }
      }
      .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 1rem;
        }
        &::-webkit-scrollbar-thumb {
          border: 0.35rem solid transparent;
          background-clip: padding-box;
          background-color: #c1c1c1;
          border-radius: 10rem;
          &:hover {
            background-color: #a8a8a8;
          }
          &:active {
            background-color: #787878;
          }
        }
        .cart-card {
          padding: 0.5rem;
          margin: 0 -0.5rem;
          display: grid;
          grid-template-columns: 4rem 1fr 2rem;
          grid-gap: 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid transparent;

          transition:
            background 150ms ease-in-out,
            border 150ms ease-in-out;
          &:hover {
            background: $gray-100;
            border: 1px solid $gray-250;
            .delCart-wrapper {
              .delCart {
                opacity: 1;
                transform: translateX(-0.125rem);
              }
            }
          }
          .text-container {
            overflow: hidden;
            .product-title {
              margin-bottom: 0.125rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .product-title {
              @include font-md;
            }
            .color-size {
              @include font-sm;

              color: $gray-600;
              font-weight: 500;
            }
            .price {
              @include font-sm;
              font-weight: 500;
              color: $gray-600;

              @include xs {
                display: flex;
                flex-direction: column;
              }
              .origin-price {
                font-weight: 300;
                color: $gray-500;
                text-decoration: line-through;
              }
            }
          }
          .delCart-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .delCart {
              padding: 0;
              opacity: 0;
              line-height: 0;
              transform: translateX(0.125rem);

              transition:
                opacity 300ms ease-in-out,
                transform 300ms ease-in-out;
              .material-icons {
                color: $gray-500;
                transition: color 150ms ease-in-out;
              }
              &:focus {
                box-shadow: none;
              }
              &:hover > .material-icons {
                color: rgba(0, 0, 0, 0.54);
              }
              &:active > .material-icons {
                color: rgba(0, 0, 0, 0.65);
              }
              &:active {
                box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
              }
            }
            .shopping-link {
              padding: 0;
              opacity: 1;
              line-height: 0;

              transition:
                opacity 300ms ease-in-out,
                transform 300ms ease-in-out;
              .material-icons {
                color: $gray-500;
                transition: color 150ms ease-in-out;
              }
              &:focus {
                box-shadow: none;
              }
              &:hover > .material-icons {
                color: rgba(0, 0, 0, 0.54);
              }
              &:active > .material-icons {
                color: rgba(0, 0, 0, 0.65);
              }
              &:active {
                box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
              }
            }
          }
        }
        .nothing {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: $aside-navbar-width;
          .material-icons {
            margin-bottom: 1rem;
            color: $gray-600;
          }
          .nothing-text {
            margin-bottom: 1rem;
            font-weight: 500;
            color: $gray-600;
          }
          .goshoping {
            margin: 0;
            color: #fff;
            background: $color-main;
            transition: background 150ms ease-in-out;
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
          }
        }
      }
      .modal-footer {
        padding: 1.5rem 1.5rem 2.5rem 1.5rem;
        .total {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 0;

          color: $gray-600;
        }
        .checkout {
          margin: 0;
          color: #fff;
          background: $color-main;
          transition: background 150ms ease-in-out;
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
        }
      }
    }
  }
}
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(50px, 0);
}
.modal.show .modal-dialog {
  transform: none;
}
</style>
