<template>
  <swiper
    :style="{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }"
    :loop="true"
    :spaceBetween="8"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    class="mySwiperTop"
  >
    <swiper-slide>
      <img class="img-fluid" :src="product.imageUrl" />
    </swiper-slide>
    <swiper-slide v-for="(item, index) in product.imagesUrl" :key="index">
      <img class="img-fluid" :src="item" />
    </swiper-slide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="8"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    class="mySwiperBottom"
  >
    <swiper-slide>
      <img class="img-fluid" :src="product.imageUrl" />
    </swiper-slide>
    <swiper-slide v-for="(item, index) in product.imagesUrl" :key="index">
      <img class="img-fluid" :src="item" />
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.css';

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['tempProduct'],
  data() {
    return {
      thumbsSwiper: null,
      product: [],
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
  },
  watch: {
    tempProduct() {
      this.product = JSON.parse(JSON.stringify(this.tempProduct));
      console.log(this.product);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/stylesheets/custom/_variable';

.mySwiperTop,
.mySwiperBottom {
  height: 100%;
  width: 100%;
}

.mySwiperBottom {
  padding-top: 0.5rem;
  .swiper-slide {
    opacity: 0.3;
    cursor: pointer;
    &:active {
      box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
    }
  }
  .swiper-slide-thumb-active {
    cursor: default;
    border: 2px solid #656565;
    opacity: 1;
     &:active {
      box-shadow: none;
    }
  }
}
</style>
