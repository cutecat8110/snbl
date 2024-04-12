<template>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="container py-4">
      <div class="bg-white px-4 border">
        <div class="navbar py-3">
          <div class="container-fluid">
            <span class="navbar-brand">訂單管理</span>
          </div>
        </div>
        <div class="table-responsive mb-3">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-gray-000">
              <tr>
                <th class="position-relative" width="128">下單日期</th>
                <th class="position-relative">訂單編號</th>
                <th class="position-relative">商品</th>
                <th class="position-relative" width="128">應付金額</th>
                <th class="position-relative" width="128">狀態</th>
                <th width="128">編輯</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, key) in orders" :key="key">
                <tr v-if="orders.length" :class="{ 'text-gray-500 fw-light': !item.is_paid }">
                  <td>{{ $filters.date(item.create_at) }}</td>
                  <td>{{ item.id.substr(1) }}</td>
                  <td>
                    <ul class="list-unstyled my-0">
                      <li v-for="(product, i) in item.products" :key="i">
                        {{ product.product.title }} 數量：{{ product.qty }}
                        {{ product.product.unit }}
                      </li>
                    </ul>
                  </td>
                  <td>{{ $filters.currency(item.total) }}</td>
                  <td>
                    <div class="form-check form-switch">
                      <input
                        :id="`paidSwitch${item.id}`"
                        v-model="item.is_paid"
                        class="form-check-input"
                        type="checkbox"
                        @change="updatePaid(item)"
                      />
                      <label class="form-check-label" :for="`paidSwitch${item.id}`">
                        <span v-if="item.is_paid">付款</span>
                        <span v-else>未付款</span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-primary btn-sm"
                        type="button"
                        @click="openModal('edit', item)"
                      >
                        編輯
                      </button>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        type="button"
                        @click="openModal('delete', item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <Pagination :pages="pagination" @emit-page="getOrders"></Pagination>
      </div>
    </div>
    <!-- 編輯 元件 -->
    <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid"></OrderModal>
    <!-- 刪除 元件 -->
    <DelModal
      ref="delModal"
      :delItem="tempOrder.id"
      :origin="pageName"
      @del-item="delOrder"
    ></DelModal>
  </div>
</template>

<script>
import DelModal from '@/components/back/DelModal.vue'
import OrderModal from '@/components/back/OrderModal.vue'
import Pagination from '@/components/back/Pagination.vue'

export default {
  components: {
    DelModal,
    Pagination,
    OrderModal
  },
  inject: ['httpMessageState'],
  data() {
    return {
      pageName: '訂單',
      isLoading: false,
      pagination: [],
      currentPage: 1,
      orders: [],
      tempOrder: {
        id: ''
      }
    }
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true
      this.currentPage = page
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(url, this.tempProduct).then((res) => {
        this.orders = res.data.orders
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    },
    openModal(event, item) {
      this.tempOrder = { ...item }
      if (event === 'edit') {
        this.$refs.orderModal.openModal()
      } else if (event === 'delete') {
        this.$refs.delModal.openModal()
      }
    },
    updatePaid(item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      const status = '更新付款狀態'
      this.$http.put(api, { data: paid }).then((res) => {
        this.getOrders(this.currentPage)
        this.isLoading = false
        this.$refs.orderModal.hideModal()
        this.httpMessageState(res, status)
      })
    },
    delOrder() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http.delete(url).then((res) => {
        this.getOrders(this.currentPage)
        this.isLoading = false
        this.httpMessageState(res, '刪除訂單')
        this.$refs.delModal.hideModal()
      })
    }
  },
  created() {
    this.getOrders()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_backTable';
</style>
