<template>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="container py-4">
      <div class="bg-white px-4 border">
        <div class="navbar py-3">
          <div class="container-fluid">
            <span class="navbar-brand">優惠管理列表</span>
            <button
              class="btn-sm btn-primary d-flex align-items-center"
              @click="openCouponModal(true)"
            >
              <i class="material-icons md-18">add</i>
              <span>新增</span>
            </button>
          </div>
        </div>
        <div class="table-responsive mb-3">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-gray-000">
              <tr>
                <th class="position-relative" width="128">有效期限</th>
                <th class="position-relative">名稱</th>
                <th class="position-relative">優惠碼</th>
                <th class="position-relative">折扣</th>
                <th class="position-relative" width="128">狀態</th>
                <th width="128">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in coupons" :key="key">
                <td>{{ $filters.date(item.due_date) }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.percent / 10 }} 折</td>
                <td>
                  <div v-if="item.is_enabled === 1" class="text-success d-flex align-items-center">
                    <div class="circle bg-success me-2"></div>
                    <span>啟用 </span>
                  </div>
                  <span v-else class="d-flex align-items-center">
                    <div class="circle bg-gray-300 me-2"></div>
                    <span>關閉 </span>
                  </span>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      @click="openCouponModal(false, item)"
                    >
                      編輯
                    </button>
                    <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination :pages="pagination" @emit-page="getCoupons"></Pagination>
      </div>
    </div>
    <!-- 新增/編輯 元件 -->
    <CouponModal
      ref="couponModal"
      :coupon="tempCoupon"
      :is-new="isNew"
      @update-coupon="updateCoupon"
    ></CouponModal>
    <!-- 刪除 元件 -->
    <DelModal
      ref="delModal"
      :delItem="tempCoupon.title"
      :origin="pageName"
      @del-item="delCoupon"
    ></DelModal>
  </div>
</template>

<script>
import CouponModal from '@/components/back/CouponModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import Pagination from '@/components/back/Pagination.vue'

export default {
  components: { CouponModal, DelModal, Pagination },
  inject: ['httpMessageState'],
  data() {
    return {
      pageName: '優惠',
      coupons: {},
      pagination: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false,
      currentPage: 1
    }
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item }
      this.$refs.delModal.openModal()
    },
    getCoupons(page = 1) {
      this.isLoading = true
      this.currentPage = page
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(url, this.tempProduct).then((res) => {
        this.pagination = res.data.pagination
        this.coupons = res.data.coupons
        this.isLoading = false
      })
    },
    updateCoupon(item) {
      this.isLoading = true
      this.tempCoupon = item
      this.tempCoupon.is_enabled = Number(this.tempCoupon.is_enabled)

      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      let status = '新增優惠'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        httpMethod = 'put'
        status = '更新優惠'
      }

      this.$http[httpMethod](api, { data: this.tempCoupon }).then((res) => {
        if (res.data.success) {
          this.getCoupons(this.currentPage)
          this.isLoading = false
          this.$refs.couponModal.hideModal()
          this.httpMessageState(res, status)
        } else {
          this.isLoading = false
          this.httpMessageState(res, status)
        }
      })
    },
    delCoupon() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(url).then((res) => {
        this.getCoupons(this.currentPage)
        this.isLoading = false
        this.httpMessageState(res, '刪除優惠')
        this.$refs.delModal.hideModal()
      })
    }
  },
  created() {
    this.getCoupons()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_backTable';
</style>
