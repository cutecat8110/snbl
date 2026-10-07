<template>
  <template v-if="slides.length">
    <swiper
      class="mySwiperTop"
      :loop="true"
      :navigation="true"
      :observeParents="true"
      :observer="true"
      :observeSlideChildren="true"
      :style="{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }"
      :thumbs="{ swiper: thumbsSwiper }"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(src, index) in slides" :key="src">
        <img class="img-fluid" v-bind="$imageAttributes(src, index === 0 ? 'eager' : 'lazy')"
          :fetchpriority="index === 0 ? 'high' : 'auto'" :alt="product.title" />
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
      <swiper-slide v-for="src in slides" :key="src">
        <img class="img-fluid" v-bind="$imageAttributes(src)" :alt="product.title" />
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

import { imageSources } from '@/methods/images'

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
      thumbsSwiper: null
    }
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    }
  },
  computed: {
    product() { return this.tempProduct || {} },
    slides() { return imageSources([this.product.imageUrl, ...(this.product.imagesUrl || [])]) }
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

.mySwiperBottom {
  padding-top: 0.5rem;
  .swiper-slide {
    opacity: 0.3;
    cursor: pointer;
    border: 2px solid transparent;
    &:hover {
      opacity: 1;
      border: 2px solid #656565;
    }
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
