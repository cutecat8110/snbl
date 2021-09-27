<template>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="delProductModalLabel" class="modal-title">
            <span>刪除{{ origin }}</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否永久刪除【
          <strong class="text-danger">&nbsp;{{ delItem }}&nbsp;</strong> 】?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary me-3" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">
            刪除
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
  props: ['origin', 'delItem'],
  emits: ['del-item'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_modal';
</style>
