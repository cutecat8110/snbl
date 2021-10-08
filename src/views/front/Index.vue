<template>
  <div id="front">
    <ProductSwiper></ProductSwiper>
    <router-view></router-view>
    <ScrollTop></ScrollTop>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script>
import ProductSwiper from '@/components/front/FrontHeader.vue';
import FrontFooter from '@/components/front/FrontFooter.vue';
import ScrollTop from '@/components/common/ScrollTop.vue';
import emitter from '@/methods/eventBus';

export default {
  components: { ProductSwiper, FrontFooter, ScrollTop },
  provide() {
    return {
      emitter,
    };
  },
};
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
