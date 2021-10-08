<template>
  <div
    id="CartModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="CartModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body ">
          <template v-if="cart.carts">
            <div v-for="item in cart.carts" :key="item.id">
              <img class="img-fluid rounded" :src="item.product.imageUrl" />
              {{ item.product.title }}
              {{ item.qty }}
              <button class="qty-btn btn" type="button" @click.prevent="delCart(item.id)">
                <i class="material-icons md-dark">delete</i>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  mixins: [modalMixin],
  inject: ['emitter'],

  data() {
    return {
      cart: {},
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.cart = res.data.data;
        this.emitter.emit('pushCart', this.cart);
      });
    },
    delCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.getCart();
        }
      });
    },
  },
  created() {
    this.getCart();
    this.emitter.on('getCart', () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

#CartModal {
  .modal-dialog {
    width: $product-form-width;
    max-width: none;
    height: 100%;
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
    .modal-content {
      height: 100%;
      .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
        img {
          width: 4rem;
          height: 4rem;
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
