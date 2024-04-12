<template>
  <div class=" ">
    <div class="container py-4">
      <HomeSwiper :image="image"></HomeSwiper>
      <section>
        <h2>
          <span><i class="far fa-star"></i>TOP&nbsp;100<i class="far fa-star"></i></span>
          熱門商品
        </h2>
        <div class="card-wrapper">
          <template v-for="(item, index) in randomProducts" :key="index">
            <router-link class="home-card rounded" :to="{ path: `/product/${item.id}` }">
              <div class="img-wrapper">
                <div class="img" :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }"></div>
              </div>
            </router-link>
          </template>
        </div>
      </section>
      <div class="qr">
        <img src="@/assets/QR.jpg" alt="QR.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import HomeSwiper from '@/components/front/HomeSwiper.vue'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export default {
  inject: ['emitter'],
  components: {
    HomeSwiper
  },
  data() {
    return {
      image: [],
      image2: [],
      productsAll: {},
      randomProducts: []
    }
  },
  methods: {
    render() {
      this.emitter.emit('isLoading', true)
      const id = '-MntdJ6iOSdc64gJi26G'
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`

      this.$http.get(url).then((res) => {
        this.image = res.data.article.articleImagesUrl
      })

      this.getAll()
    },
    getAll() {
      this.emitter.emit('isLoading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        this.productsAll = res.data.products
        const arrSet = new Set([])
        for (let index = 0; arrSet.size < 30; index + 1) {
          const num = getRandomInt(this.productsAll.length)
          arrSet.add(num)
        }
        arrSet.forEach((i) => {
          this.randomProducts.push(this.productsAll[i])
        })
        this.emitter.emit('isLoading', false)
      })
    }
  },
  created() {
    this.render()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

.container {
  display: grid;
  flex: 1;
  grid-template-columns: 1fr;
  grid-gap: 2.5rem;

  .banner {
    width: 100%;
  }

  h2 {
    display: flex;
    align-items: center;
    flex-direction: column;

    margin-bottom: 1.5rem;
    text-indent: 0.25rem;
    letter-spacing: 0.25em;
    color: $gray-600;
    @include font-xl;
    @include xs {
      margin: 1rem;
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

  .card-wrapper {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;

    @include md {
      grid-template-columns: repeat(2, 1fr);
    }
    @include xs {
      grid-gap: 1rem;
    }

    .home-card {
      transition: box-shadow 150ms ease-in-out;

      .img-wrapper {
        overflow: hidden;
        position: relative;

        width: 100%;
        border-radius: 0.25rem;
        padding-bottom: 133.33%;

        .img {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;

          width: 100%;
          height: 100%;
          background-position: center;
          background-size: cover;

          transition: opacity 300ms ease-in-out;
        }
      }

      &:hover .img {
        opacity: 0.7;
      }
    }
  }

  .qr {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5rem 0;
  }
}
</style>
