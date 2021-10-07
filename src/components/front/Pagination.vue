<template>
  <nav>
    <a
      href="#"
      class="page-btn raquo"
      @click.prevent="
        if (!(pages.current_page === 1)) {
          emitPage(pages.current_page - 1);
        }
      "
      :class="{ disabled: pages.current_page === 1 }"
    >
      <i class="material-icons md-18 md-dark">chevron_left</i>
    </a>

    <template v-for="(item, index) in pages.total_pages" :key="index">
      <div v-if="item === pages.current_page" class="page-btn cursor active">
        {{ item }}
      </div>
      <a v-else href="#" class="page-btn" @click.prevent="emitPage(item)">
        {{ item }}
      </a>
    </template>

    <a
      href="#"
      class="page-btn raquo"
      @click.prevent="
        if (!(pages.current_page === pages.total_pages)) {
          emitPage(pages.current_page + 1);
        }
      "
      :class="{ disabled: pages.current_page === pages.total_pages }"
    >
      <i class="material-icons md-18 md-dark">chevron_right</i>
    </a>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    emitPage(item) {
      this.$emit('emit-page', item);
    },
  },
};
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
    padding: 0 0.5rem;
    color: $gray-900;
    border: 1px solid $gray-250;
    border-radius: 0.25rem;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: box-shadow 150ms ease-in-out, color 150ms ease-in-out, border 150ms ease-in-out;

    &.raquo {
      width: 28px;
      padding: 0;
      border: 1px solid transparent;
      &:hover > .md-dark {
        color: rgba(0, 0, 0, 0.64);
      }
      &:active > .md-dark {
        color: rgba(0, 0, 0, 0.74);
      }
    }
    &.active {
      border: 1px solid $color-border-active;
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.38;
    }
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
    &:active:not(.active):not(.disabled) {
      box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
    }
    &:hover:not(.raquo) {
      border: 1px solid $color-border-active;
    }
  }
}
</style>
