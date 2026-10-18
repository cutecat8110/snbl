<template>
  <button
    class="favorite-toggle"
    :class="{ active }"
    type="button"
    :aria-label="`${active ? '取消收藏' : '收藏'}${name}`"
    :aria-pressed="active"
    @click="$emit('toggle')"
  >
    <i class="material-icons" aria-hidden="true">{{ active ? 'bookmark' : 'bookmark_border' }}</i>
  </button>
</template>

<script>
export default {
  props: { active: Boolean, name: { type: String, default: '' } },
  emits: ['toggle']
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
.favorite-toggle {
  display: inline-flex;
  align-self: start;
  padding: 0;
  border: 0;
  border-radius: 0.25rem;
  background: transparent;
  color: $gray-600;
  cursor: pointer;
  transition: color 150ms ease-in-out;
  &:hover, &.active { color: $color-main; }
  &:active { color: $color-main-active; }
  &:focus-visible { outline: 2px solid $color-main; outline-offset: 3px; }
  .material-icons { color: inherit; }
}
</style>
