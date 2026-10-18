<template>
  <nav aria-label="商品分頁">
    <button
      class="page-btn raquo"
      type="button"
      aria-label="上一頁"
      :disabled="!pages.current_page || pages.current_page <= 1"
      @click="emitPage(pages.current_page - 1)"
    ><i class="material-icons md-18 md-dark" aria-hidden="true">chevron_left</i></button>
    <template v-for="item in pages.total_pages" :key="item">
      <span v-if="item === pages.current_page" class="page-btn cursor active" aria-current="page">{{ item }}</span>
      <button v-else class="page-btn" type="button" :aria-label="`第 ${item} 頁`" @click="emitPage(item)">{{ item }}</button>
    </template>
    <button
      class="page-btn raquo"
      type="button"
      aria-label="下一頁"
      :disabled="!pages.total_pages || pages.current_page >= pages.total_pages"
      @click="emitPage(pages.current_page + 1)"
    ><i class="material-icons md-18 md-dark" aria-hidden="true">chevron_right</i></button>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    emitPage(item) {
      if (!Number.isInteger(item) || !this.pages.total_pages || item < 1 || item > this.pages.total_pages || item === this.pages.current_page) return
      this.$emit('emit-page', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
nav {
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .page-btn {
    height: 28px;
    background: transparent;
    font: inherit;
    padding: 0 0.5rem;
    color: $gray-900;
    border: 1px solid $gray-250;
    border-radius: 0.25rem;

    display: flex;
    justify-content: center;
    align-items: center;

    transition:
      box-shadow 150ms ease-in-out,
      color 150ms ease-in-out,
      border 150ms ease-in-out;

    &.raquo {
      width: 28px;
      padding: 0;
      border: 1px solid transparent;
      &:hover > .md-dark {
        color: rgba(0, 0, 0, 0.65);
      }
      &:active > .md-dark {
        color: rgba(0, 0, 0, 0.74);
      }
    }
    &:focus-visible { outline: 2px solid $color-main; outline-offset: 3px; }
    &.active {
      border: 1px solid $color-border-active;
    }
    &:disabled {
      pointer-events: none;
      opacity: 0.38;
    }
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
    &:active:not(.active):not(:disabled) {
      box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
    }
    &:hover:not(.raquo) {
      border: 1px solid $color-border-active;
    }
  }
}
</style>
