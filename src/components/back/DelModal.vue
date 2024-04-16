<template>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade"
    aria-hidden="true"
    aria-labelledby="delProductModalLabel"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="delProductModalLabel" class="modal-title">
            <span>刪除{{ origin }}</span>
          </h3>
          <button
            class="btn-close"
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          是否永久刪除【
          <strong class="text-danger">&nbsp;{{ delItem }}&nbsp;</strong> 】?
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary me-3" type="button" data-bs-dismiss="modal">
            取消
          </button>
          <button class="btn btn-danger" type="button" @click="$emit('del-item')">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  props: ['origin', 'delItem'],
  emits: ['del-item']
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_modal';
</style>
