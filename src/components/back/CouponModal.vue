<template>
  <div
    id="couponModal"
    ref="modal"
    class="modal fade"
    aria-hidden="true"
    aria-labelledby="couponModalLabel"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="exampleModalLabel" class="modal-title">
            <span v-if="isNew">新增優惠</span>
            <span v-else>編輯優惠</span>
          </h3>
          <button
            class="btn-close"
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-3 mb-3">
            <!-- 優惠名稱 -->
            <div class="col-12">
              <label class="form-label" for="title">優惠名稱</label>
              <div
                :class="tempCoupon.title ? 'inputClear' : ''"
                class="form-group position-relative"
              >
                <input
                  id="title"
                  v-model="tempCoupon.title"
                  class="form-control"
                  type="text"
                  placeholder="請輸入"
                />
                <button
                  v-if="tempCoupon.title"
                  v-on:click="
                    () => {
                      tempCoupon.title = ''
                      clearFocus('productTitle')
                    }
                  "
                  class="btn-close position-absolute top-50 end-0 translate-middle-y"
                  type="button"
                ></button>
              </div>
            </div>
            <!-- 優惠碼 -->
            <div class="col-12">
              <label class="form-label" for="coupon_code">優惠碼</label>
              <div
                :class="tempCoupon.code ? 'inputClear' : ''"
                class="form-group position-relative"
              >
                <input
                  id="coupon_code"
                  v-model="tempCoupon.code"
                  class="form-control"
                  type="text"
                  placeholder="請輸入"
                />
                <button
                  v-if="tempCoupon.code"
                  v-on:click="
                    () => {
                      tempCoupon.code = ''
                      clearFocus('productTitle')
                    }
                  "
                  class="btn-close position-absolute top-50 end-0 translate-middle-y"
                  type="button"
                ></button>
              </div>
            </div>
            <!-- 有效期限 -->
            <div class="col-12">
              <label class="form-label" for="due_date">有效期限</label>
              <input id="due_date" v-model="due_date" class="form-control" type="date" />
            </div>
            <!-- 折扣 -->
            <div class="col-12">
              <label class="form-label" for="price">折扣</label>
              <div class="input-group">
                <input
                  id="price"
                  v-model.number="tempCoupon.percent"
                  class="form-control"
                  type="number"
                  placeholder="請輸入例如：85 ( 等於 8.5 折 )"
                  max="100"
                  min="0"
                />
                <span class="input-group-text bg-light">折</span>
              </div>
            </div>
            <!-- 狀態 -->
            <div class="col-12">
              <label> 優惠方案 </label>
              <div class="col">
                <!-- 啟用 -->
                <label class="d-inline-block py-2 me-2" for="isEnabled1">
                  <input
                    id="isEnabled1"
                    v-model="tempCoupon.is_enabled"
                    class="form-check-input"
                    type="radio"
                    value="1"
                  />
                  <span class="px-2"> 啟用 </span>
                </label>
                <!-- 關閉 -->
                <label class="d-inline-block py-2 me-2" for="isEnabled0">
                  <input
                    id="isEnabled0"
                    v-model="tempCoupon.is_enabled"
                    class="form-check-input"
                    type="radio"
                    value="0"
                  />
                  <span class="px-2"> 關閉 </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary me-3" type="button" data-bs-dismiss="modal">
            取消
          </button>
          <button class="btn btn-primary" type="button" @click="$emit('update-coupon', tempCoupon)">
            確定
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
  props: {
    coupon: {
      type: Object,
      default() {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-coupon'],
  data() {
    return {
      tempCoupon: {},
      due_date: ''
    }
  },
  watch: {
    coupon() {
      this.tempCoupon = JSON.parse(JSON.stringify(this.coupon))
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
      ;[this.due_date] = dateAndTime

      if (this.tempCoupon.is_enabled === undefined) {
        this.tempCoupon.is_enabled = 1
      }
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_modal';
</style>
