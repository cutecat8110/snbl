<template>
  <template v-if="image">
    <swiper
      class="mySwiperHome"
      :allowTouchMove="false"
      :autoplay="{
        delay: 4500,
        disableOnInteraction: false
      }"
      :effect="'fade'"
      :loop="true"
      :pagination="true"
    >
      <swiper-slide>
        <div class="banner-img" :style="{ backgroundImage: 'url(' + image[0] + ')' }">
          <div class="text-box">
            <div class="title">SNBL</div>
            <div class="slogan">一千萬少女的選擇</div>
          </div>
        </div>
        <div class="mark"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="banner-img" :style="{ backgroundImage: 'url(' + image[1] + ')' }">
          <div class="text-box">
            <div class="title">SNBL</div>
            <div class="slogan">一千萬少女的選擇</div>
          </div>
        </div>
        <div class="mark"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="banner-img" :style="{ backgroundImage: 'url(' + image[2] + ')' }">
          <div class="text-box">
            <div class="title">SNBL</div>
            <div class="slogan">一千萬少女的選擇</div>
          </div>
        </div>
        <div class="mark"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="banner-img" :style="{ backgroundImage: 'url(' + image[3] + ')' }">
          <div class="text-box">
            <div class="title">SNBL</div>
            <div class="slogan">一千萬少女的選擇</div>
          </div>
        </div>
        <div class="mark"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="banner-img" :style="{ backgroundImage: 'url(' + image[4] + ')' }">
          <div class="text-box">
            <div class="title">SNBL</div>
            <div class="slogan">一千萬少女的選擇</div>
          </div>
        </div>
        <div class="mark"></div>
      </swiper-slide>
      <router-link class="shop-btn-wrapper" to="/products">
        <div class="shop-btn">
          SHOP NOW
          <i class="fas fa-arrow-right"></i>
        </div>
      </router-link>
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
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination, Thumbs } from 'swiper'

// install Swiper modules
SwiperCore.use([Pagination, EffectFade, Autoplay, Navigation, Thumbs])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: ['image']
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/custom/_variable';

.mySwiperHome {
  width: 100%;
  height: 600px;
  @include md {
    height: 300px;
  }
}

.mySwiperHome {
  overflow: hidden;

  border-radius: 0.25rem;

  .banner-img {
    display: flex;
    align-items: flex-end;

    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;

    .text-box {
      position: relative;
      z-index: 10;

      padding: 0 0 6rem 6rem;
      color: #ffffff;
      @include md {
        padding: 0 0 2rem 2rem;
      }
      @include sm {
        padding: 0 0 2rem 1rem;
      }

      .title {
        letter-spacing: 0.2em;
        opacity: 0.9;
        @include font-xxl;
      }

      .slogan {
        font-weight: 500;
        letter-spacing: 0.5em;
        opacity: 0.7;
        @include font-sm;
      }
    }
  }

  .mark {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 40%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.38));
    @include md {
      height: 33%;
    }
  }

  .shop-btn-wrapper {
    position: absolute;
    z-index: 11;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    &:hover {
      .shop-btn {
        opacity: 0.9;

        ::after {
          right: unset;
          left: 0;

          width: 100%;
        }
      }
    }

    .shop-btn {
      position: absolute;
      z-index: 11;
      right: 0;
      bottom: 0;

      margin: 0 6rem 5.25rem 0;
      letter-spacing: 0.2em;
      color: #ffffff;
      opacity: 0.7;

      transition: opacity 150ms ease-in-out;
      @include md {
        margin: 0 2rem 2rem 0;
      }
      @include sm {
        margin: 1rem 1rem 0 0;
        top: 0;
      }

      ::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: -0.5rem;

        width: 0;
        height: 3px;
        background: #ffffff;
        opacity: 0.38;

        transition: width 350ms ease-in-out;
        @include md {
          bottom: -0.25rem;
        }
      }

      i {
        margin-left: 0.25rem;
      }
    }
  }

  .swiper-pagination {
    bottom: 0;

    padding: 0 0 4.5rem 5.75rem;
    text-align: start;
    @include md {
      padding: 0 0 0.75rem 1.75rem;
    }
    @include sm {
      padding: 0 0 0.75rem 0.75rem;
    }

    .swiper-pagination-bullet {
      background: #ffffff;

      &.swiper-pagination-bullet-active {
        opacity: 0.7;
      }
    }
  }
}
</style>
