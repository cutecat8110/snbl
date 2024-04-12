<template>
  <div id="front">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <FrontHeader></FrontHeader>
    <router-view></router-view>
    <ScrollTop></ScrollTop>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script>
import ScrollTop from '@/components/common/ScrollTop.vue'
import FrontFooter from '@/components/front/FrontFooter.vue'
import FrontHeader from '@/components/front/FrontHeader.vue'
import emitter from '@/methods/eventBus'

export default {
  components: { FrontHeader, FrontFooter, ScrollTop },
  provide() {
    return {
      emitter
    }
  },
  data() {
    return {
      isLoading: false,
      fullPage: true
    }
  },
  created() {
    emitter.on('isLoading', (item) => {
      this.isLoading = item
    })
  }
}
</script>

<style lang="scss" scoped>
#front {
  min-height: 100%;
  padding-top: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
