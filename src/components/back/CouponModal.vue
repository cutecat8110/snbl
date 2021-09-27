<template>
  <div
    id="couponModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="exampleModalLabel" class="modal-title">
            <span v-if="isNew">新增優惠</span>
            <span v-else>編輯優惠</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-3 mb-3">
            <!-- 優惠名稱 -->
            <div class="col-12">
              <label for="title" class="form-label">優惠名稱</label>
              <div
                class="form-group position-relative"
                :class="tempCoupon.title ? 'inputClear' : ''"
              >
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempCoupon.title"
                  placeholder="請輸入"
                />
                <button
                  v-if="tempCoupon.title"
                  type="button"
                  class="btn-close
                    position-absolute top-50 end-0 translate-middle-y"
                  v-on:click="
                    tempCoupon.title = '';
                    clearFocus('productTitle');
                  "
                ></button>
              </div>
            </div>
            <!-- 優惠碼 -->
            <div class="col-12">
              <label for="coupon_code" class="form-label">優惠碼</label>
              <div
                class="form-group position-relative"
                :class="tempCoupon.code ? 'inputClear' : ''"
              >
                <input
                  type="text"
                  class="form-control"
                  id="coupon_code"
                  v-model="tempCoupon.code"
                  placeholder="請輸入"
                />
                <button
                  v-if="tempCoupon.code"
                  type="button"
                  class="btn-close
                    position-absolute top-50 end-0 translate-middle-y"
                  v-on:click="
                    tempCoupon.code = '';
                    clearFocus('productTitle');
                  "
                ></button>
              </div>
            </div>
            <!-- 有效期限 -->
            <div class="col-12">
              <label for="due_date" class="form-label">有效期限</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date" />
            </div>
            <!-- 折扣 -->
            <div class="col-12">
              <label for="price" class="form-label">折扣</label>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  max="100"
                  min="0"
                  v-model.number="tempCoupon.percent"
                  placeholder="請輸入例如：85 ( 等於 8.5 折 )"
                />
                <span class="input-group-text bg-light">折</span>
              </div>
            </div>
            <!-- 狀態 -->
            <div class="col-12">
              <label>
                優惠方案
              </label>
              <div class="col">
                <!-- 啟用 -->
                <label for="isEnabled1" class="d-inline-block py-2 me-2">
                  <input
                    id="isEnabled1"
                    class="form-check-input"
                    type="radio"
                    v-model="tempCoupon.is_enabled"
                    value="1"
                  />
                  <span class="px-2">
                    啟用
                  </span>
                </label>
                <!-- 關閉 -->
                <label for="isEnabled0" class="d-inline-block py-2 me-2">
                  <input
                    id="isEnabled0"
                    class="form-check-input"
                    type="radio"
                    v-model="tempCoupon.is_enabled"
                    value="0"
                  />
                  <span class="px-2">
                    關閉
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary me-3" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  mixins: [modalMixin],
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update-coupon'],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = JSON.parse(JSON.stringify(this.coupon));
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      [this.due_date] = dateAndTime;

      if (this.tempCoupon.is_enabled === undefined) {
        console.log(this.tempCoupon.is_enabled);
        this.tempCoupon.is_enabled = 1;
      }
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_modal';
</style>
