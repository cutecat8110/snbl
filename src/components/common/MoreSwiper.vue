<template>
  <template v-if="tempProduct.length > 0">
    <div class="more-look-like">
      <span>SIMILAR LOOKS</span>
      相似商品
    </div>
    <swiper
      :slidesPerView="3"
      :loop="true"
      :spaceBetween="16"
      :navigation="true"
      class="mySwiperMore"
    >
      <swiper-slide v-for="item in tempProduct" :key="item" class="img-wrapper">
        <router-link :to="{ path: `/product/${item.id}` }">
          <img :ref="'productImagesUrl' + item" class="img-fluid" :src="item.imageUrl" />
        </router-link>
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
import SwiperCore, { Autoplay, Navigation, Thumbs } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Thumbs]);

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

.more-look-like {
  display: flex;
  align-items: center;
  flex-direction: column;

  margin: 2.5rem 0 0 0;
  border-top: 1px dashed $gray-250;
  padding: 2.5rem 1rem 0 1rem;
  text-indent: 0.25rem;
  letter-spacing: 0.25em;
  color: $gray-600;

  @include font-xl;
  @include xs {
    margin: 1rem 0 0 0;
    padding: 1.5rem 0 0 0;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: baseline;

    margin-bottom: 0.5rem;
    color: $gray-500;
    @include font-sm;

    i {
      color: $gray-250;
      @include font-sm;
    }
  }
}

.mySwiperMore {
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
  @include xs {
    padding: 1rem 0;
  }

  .img-wrapper {
    overflow: hidden;

    border-radius: 0.25rem;
  }

  .swiper-button-prev {
    left: calc(1rem + 10px);
    @include xs {
      left: 10px;
    }
  }
  .swiper-button-next {
    right: calc(1rem + 10px);
    @include xs {
      right: 10px;
    }
  }
  a {
    transition: opacity 150ms ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: rgba(255, 255, 255, 0.74);
    opacity: 0.7;

    transition: color 150ms ease-in-out, opacity 150ms ease-in-out;

    &:hover {
      opacity: 1;
    }

    &:active {
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }
}
</style>
