<template>
  <div
    id="oderModal"
    ref="modal"
    class="modal fade"
    aria-hidden="true"
    aria-labelledby="oderModalLabel"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="exampleModalLabel" class="modal-title">
            <span>編輯訂單</span>
          </h3>
          <button
            class="btn-close"
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <section class="mb-4">
            <h5>客戶資訊</h5>
            <div class="pb-2 w-100">
              <table class="table m-0">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="mb-4">
            <h5>訂單資訊</h5>
            <div class="pb-2 w-100">
              <table class="table m-0">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單日期</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款日期</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-gray-500">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>應付金額</th>
                    <td>
                      {{ $filters.currency(tempOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="mb-4">
            <h5>訂單明細</h5>
            <div class="pb-2 mw-100">
              <table class="table m-0">
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th style="white-space: normal">
                      {{ item.product.title }}
                    </th>
                    <td class="col-1">{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="col-1 text-end">
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="mb-3">
            <h5>付款狀態</h5>
            <div class="row g-3 p-2">
              <div class="col">
                <!-- 開啟 -->
                <label class="d-inline-block py-2 me-2" for="isEnabled1">
                  <input
                    id="isEnabled1"
                    v-model="tempOrder.is_paid"
                    class="form-check-input"
                    type="radio"
                    value="true"
                  />
                  <span class="px-2"> 開啟 </span>
                </label>
                <!-- 關閉 -->
                <label class="d-inline-block py-2 me-2" for="isEnabled0">
                  <input
                    id="isEnabled0"
                    v-model="tempOrder.is_paid"
                    class="form-check-input"
                    type="radio"
                    value="false"
                  />
                  <span class="px-2"> 關閉 </span>
                </label>
              </div>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary me-3" type="button" data-bs-dismiss="modal">
            取消
          </button>
          <button class="btn btn-primary" type="button" @click="$emit('update-paid', tempOrder)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  emits: ['update-paid'],
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      status: {},
      modal: '',
      tempOrder: {
        is_paid: ''
      },
      isPaid: false
    }
  },
  watch: {
    order() {
      this.tempOrder = { ...this.order }
    },
    'tempOrder.is_paid': {
      handler() {
        if (this.tempOrder.is_paid === 'true') {
          this.tempOrder.is_paid = true
        } else if (this.tempOrder.is_paid === 'false') {
          this.tempOrder.is_paid = false
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_modal';
</style>
