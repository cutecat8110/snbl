<template>
  <template v-if="product.imagesUrl">
    <swiper
      class="mySwiperTop"
      :loop="true"
      :navigation="true"
      :observeParents="true"
      :observer="true"
      :observeSlideChildren="true"
      :thumbs="{ swiper: thumbsSwiper }"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
        <img ref="productImagesUrl0" class="img-fluid" :src="product.imageUrl" />
      </swiper-slide>
      <swiper-slide v-for="item in product.imagesUrl" :key="item">
        <img :ref="'productImagesUrl' + item" class="img-fluid" :src="item" />
      </swiper-slide>
    </swiper>
    <swiper
      class="mySwiperBottom"
      :allowTouchMove="false"
      :observeParents="true"
      :observer="true"
      :observeSlideChildren="true"
      :slidesPerView="4"
      :spaceBetween="8"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide>
        <img class="img-fluid" :src="product.imageUrl" />
      </swiper-slide>
      <swiper-slide v-for="item in product.imagesUrl" :key="item">
        <img class="img-fluid" :src="item" />
      </swiper-slide>
    </swiper>
  </template>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// swiper bundle styles
import 'swiper/swiper.min.css'
// swiper core styles
import 'swiper/swiper-bundle.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from 'swiper'

// install Swiper modules
SwiperCore.use([Navigation, Thumbs])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: ['tempProduct'],
  data() {
    return {
      thumbsSwiper: null,
      product: []
    }
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    }
  },
  watch: {
    tempProduct() {
      this.product = JSON.parse(JSON.stringify(this.tempProduct))
    }
  },
  setup() {
    const onSlideChange = (swiper) => {
      swiper.update()
    }
    return {
      onSlideChange
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/custom/_variable';

.mySwiperTop,
.mySwiperBottom {
  height: 100%;
  width: 100%;
}

.mySwiperTop {
  border-radius: 0.25rem;
  overflow: hidden;
  .swiper-button-next,
  .swiper-button-prev {
    color: rgba(0, 0, 0, 0.54);
    opacity: 0.38;
    transition:
      color 150ms ease-in-out,
      opacity 150ms ease-in-out;
    &:hover {
      opacity: 1;
    }
    &:active {
      opacity: 1;
      color: rgba(0, 0, 0, 0.74);
    }
  }
}

.mySwiperBottom {
  padding: 0.5rem;
  margin: 0 -0.5rem -0.5rem -0.5rem;
  .swiper-slide {
    cursor: pointer;
    transition:
      opacity 150ms ease-in-out,
      box-shadow 150ms ease-in-out;
    border-radius: 0.25rem;
    overflow: hidden;
    opacity: 0.7;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.25rem;
      border: 2px solid $color-border-active;
      opacity: 0;
      transition: opacity 150ms ease-in-out;
    }
    &:hover::after,
    &:hover {
      opacity: 1;
    }
    img {
      transition: transform 300ms ease-in-out;
    }
    &:hover:not(.swiper-slide-thumb-active) > img {
      transform: scale(1.02);
    }
    &:active {
      box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
    }
  }
  .swiper-slide-thumb-active {
    cursor: default;
    opacity: 1;
    &::after {
      opacity: 1;
    }
    &:active {
      box-shadow: none;
    }
    img {
      transform: scale(1.02);
    }
  }
}
</style>
