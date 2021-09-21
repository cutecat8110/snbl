<template>
  <div class="container py-4">
    <div class="bg-white px-4 border">
      <div class="navbar py-3">
        <div class="container-fluid">
          <span class="navbar-brand">優惠券管理列表</span>
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
              <th class="position-relative col-4">名稱</th>
              <th class="position-relative">折扣百分比</th>
              <th class="position-relative">到期日</th>
              <th class="position-relative">是否啟用</th>
              <th class="col-1">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in coupons" :key="key">
              <td>{{ item.title }}</td>
              <td>{{ item.percent }}%</td>
              <td>{{ $filters.date(item.due_date) }}</td>
              <td>
                <div class="text-success d-flex align-items-center" v-if="item.is_enabled === 1">
                  <div class="circle bg-success me-2"></div>
                  <span>啟用 </span>
                </div>
                <span class="d-flex align-items-center" v-else>
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
  <CouponModal
    :coupon="tempCoupon"
    :is-new="isNew"
    ref="couponModal"
    @update-coupon="updateCoupon"
  />
  <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
</template>

<script>
import CouponModal from '@/components/back/CouponModal.vue';
import DelModal from '@/components/back/DelModal.vue';
import Pagination from '@/components/back/Pagination.vue';

export default {
  components: { CouponModal, DelModal, Pagination },
  inject: ['httpMessageState'],
  data() {
    return {
      coupons: {},
      pagination: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
      currentPage: 1,
    };
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    getCoupons(page = 1) {
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.pagination = res.data.pagination;
        this.coupons = res.data.coupons;
      });
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: tempCoupon }).then((res) => {
          if (res.data.success) {
            this.httpMessageState(res, '新增優惠券');
            this.isLoading = false;
            this.getCoupons(this.currentPage);
            this.$refs.couponModal.hideModal();
          } else {
            this.httpMessageState(res, '新增優惠券');
            this.isLoading = false;
          }
        });
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(url, { data: this.tempCoupon }).then((res) => {
          if (res.data.success) {
            this.httpMessageState(res, '更新優惠券');
            this.isLoading = false;
            this.getCoupons(this.currentPage);
            this.$refs.couponModal.hideModal();
          } else {
            this.httpMessageState(res, '更新優惠券');
            this.isLoading = false;
          }
        });
      }
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.httpMessageState(res, '刪除優惠券');
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.isLoading = false;
          this.getCoupons(this.currentPage);
        } else {
          this.httpMessageState(res, '刪除優惠券');
          this.isLoading = false;
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
