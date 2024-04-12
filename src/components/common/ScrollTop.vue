<template>
  <div :class="toTop ? 'show' : ''" class="scrollTop pointer unselect" @click="scrollToTop">
    <i class="fas fa-caret-up scrollTop-icon"></i>
    <span>TOP</span>
    <div class="box">
      <div class="test"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toTop: false
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0
      })
    },
    onScroll() {
      if (
        window.top.scrollY > document.body.offsetHeight / 2 ||
        document.body.scrollHeight - document.body.clientHeight - window.top.scrollY < 56
      ) {
        this.toTop = true
      } else {
        this.toTop = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.scrollTop {
  position: fixed;
  right: 4rem;
  bottom: 4rem;
  z-index: 1031;
  @include xl {
    right: 2.5rem;
    bottom: 2.5rem;
  }
  @include md {
    right: 2rem;
    bottom: 4rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(0, 0, 0, 0.54);
  opacity: 0;
  visibility: hidden;

  transition:
    opacity 300ms ease-in-out,
    visibility 300ms ease-in-out,
    color 150ms ease-in-out;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
  }
  &:active {
    color: rgba(0, 0, 0, 0.74);
  }
  &.show {
    opacity: 1;
    visibility: visible;
  }
  .scrollTop-icon {
    @include font-xl;
  }
  span {
    @include font-sm;
    font-weight: 700;
  }
}
</style>
