<template>
  <template v-if="product.imagesUrl">
    <swiper
      :navigation="true"
      :loop="true"
      :observer="true"
      :observeSlideChildren="true"
      :observeParents="true"
      :thumbs="{ swiper: thumbsSwiper }"
      class="mySwiperTop"
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
      @swiper="setThumbsSwiper"
      :allowTouchMove="false"
      :spaceBetween="8"
      :slidesPerView="4"
      :observer="true"
      :observeSlideChildren="true"
      :observeParents="true"
      class="mySwiperBottom"
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
import { Swiper, SwiperSlide } from 'swiper/vue';

// swiper bundle styles
import 'swiper/swiper.min.css';
// swiper core styles
import 'swiper/swiper-bundle.min.css';

// modules styles
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

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
    },
  },
  setup() {
    const onSlideChange = (swiper) => {
      console.log('slide change');
      swiper.update();
    };
    return {
      onSlideChange,
    };
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

.mySwiperTop {
  border-radius: 0.25rem;
  overflow: hidden;
  .swiper-button-next,
  .swiper-button-prev {
    color: rgba(0, 0, 0, 0.54);
    opacity: 0.38;
    transition: color 150ms ease-in-out, opacity 150ms ease-in-out;
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
  padding-top: 0.5rem;
  .swiper-slide {
    cursor: pointer;
    transition: opacity 150ms ease-in-out, border 150ms ease-in-out;
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
    &:active::after {
      opacity: 1;
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
