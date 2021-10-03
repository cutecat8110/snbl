<template>
  <div id="front">
    <ProductSwiper></ProductSwiper>
    <router-view></router-view>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script>
import ProductSwiper from '@/components/front/FrontHeader.vue';
import FrontFooter from '@/components/front/FrontFooter.vue';

export default {
  components: { ProductSwiper, FrontFooter },
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
