<template>
  <footer class="py-4">
    <div class="container">
      <div class="logo">
        <img class="img-fluid" src="@/assets/logo2.png" alt="logo2.png" />
      </div>
      <div class="section-wrapper">
        <section>
          <h6>COMPANY</h6>
          <div class="footer-link">
            <router-link to="/story"> 品牌故事<span>Story</span> </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/try-free"> 免費試穿<span>Try Free</span> </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/vip"> 會員福利<span>VIP</span> </router-link>
          </div>
        </section>
        <section>
          <h6>SERVICE</h6>
          <div class="footer-link">
            <router-link to="/qa"> 常見問題<span>FAQ</span> </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/shopping-process"> 購物流程<span>How To Buy</span> </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/policy"> 退換貨說明<span>After-sales service</span> </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/payment-delivery">
              付款及配送<span>Payment&Delivery</span>
            </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/terms"> 條款及細則<span>Privacy</span> </router-link>
          </div>
        </section>
        <section>
          <h6>CONTACT US</h6>
          <div class="tel">
            +886-980-353064
          </div>
          <div class="time">
            <span>
              MON - FRI
            </span>
            <span>
              9:00 am - 12:00 pm
            </span>
            <span>
              13:00 pm - 18:00 pm
            </span>
          </div>
          <div class="share-link-container">
            <div class="share-link">
              <a href="#" @click.prevent="" class="facebook">
                <i class="fab fa-facebook-square"></i>
              </a>
            </div>
            <div class="share-link">
              <a href="#" @click.prevent="" class="line">
                <i class="fab fa-line"></i>
              </a>
            </div>
            <div class="share-link">
              <a href="#" @click.prevent="" class="twitter">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
            <div class="share-link">
              <a href="#" @click.prevent="" class="weibo">
                <i class="fab fa-weibo"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div class="external-link">
        <router-link to="/login" target="_blank">
          <i class="material-icons md-18">settings</i>
          管理後台
        </router-link>
        <span class="interval"></span>
        <a href="https://github.com/cutecat8110/snbl" target="_blank">
          <i class="fab fa-github"></i>GitHub
        </a>
      </div>
      <div class="copy-right">
        Copyright © 2021 by Hao / 素材取自網路，僅作學習用途
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

footer {
  position: relative;
  z-index: 1030;

  border-top: rgba(0, 0, 0, 0.075) 1px dashed;
  background: #ffffff;
  white-space: nowrap;

  .container {
    .logo {
      margin: 2.5rem 0 2.5rem 0;
      height: $aside-navbar-width;
      display: flex;
      justify-content: center;
      @include xs {
        margin: 1rem 0 1rem 0;
      }
    }
    .section-wrapper {
      margin-bottom: 1.5rem;
      display: grid;
      grid-gap: 5rem;
      grid-template-columns: repeat(3, auto);

      padding: 2.5rem;
      @include sm {
        grid-template-columns: 1fr;
        grid-gap: 2rem;
        padding: 1rem;
      }
      section {
        display: flex;
        flex-direction: column;
        @include sm {
          margin-bottom: 0.5rem;
        }

        h6 {
          margin-bottom: 2rem;
          font-weight: 700;
          @include font-md;
          @include sm {
            margin-bottom: 0.5rem;
          }
        }

        .footer-link {
          &:not(:last-child) {
            margin-bottom: 0.5rem;
          }

          a {
            font-weight: 500;
            color: $gray-600;
            @include font-sm;

            transition: opacity 150ms ease-in-out;

            span {
              margin-left: 0.5rem;
              font-weight: 300;
              color: $gray-500;
            }

            &:hover {
              opacity: 0.7;
            }
          }
        }

        .tel {
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: $gray-600;
          @include font-lg;
        }

        .time {
          display: flex;
          flex-direction: column;

          margin-bottom: 1rem;
          font-weight: 500;
          color: $gray-600;
          @include font-sm;
        }

        .share-link-container {
          display: flex;

          font-size: 1.5rem;

          .share-link {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.25rem;

            transition: box-shadow 150ms ease-in-out;

            &:not(:last-child) {
              margin-right: 1rem;
            }
          }

          a {
            color: rgba(0, 0, 0, 0.54);

            :hover {
              color: rgba(0, 0, 0, 0.65);
            }

            :active {
              color: rgba(0, 0, 0, 0.74);
            }

            i {
              transition: color 150ms ease-in-out;
            }
          }
        }
      }
    }
    .external-link {
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $gray-600;
      .interval {
        width: 1px;
        height: 0.7rem;
        margin: 0 0.5rem;
        background: rgba(0, 0, 0, 0.54);
        opacity: 0.38;
      }
      a {
        display: flex;
        align-items: center;
        color: $gray-600;
        transition: opacity 150ms ease-in-out;
        @include font-sm;

        i {
          margin-right: 0.5rem;
        }
        &:hover {
          opacity: 0.7;
        }
      }
    }
    .copy-right {
      margin-bottom: 2.5rem;
      font-weight: 300;
      text-align: center;
      color: $gray-500;
      @include font-sm;
      white-space: normal;
    }
  }
}
</style>
