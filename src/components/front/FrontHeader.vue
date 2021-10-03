<template>
  <header class="fixed-top">
    <nav class="navbar navbar-expand-lg shadow-sm navbar-light bg-white">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="logo.png" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav,#navbartest"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <nav class="collapse navbar-collapse flex-grow-0" id="navbarNav">
          <div class="navbar-nav fw-medium">
            <router-link to="/products" class="nav-link">
              ALL ITEMS
            </router-link>
            <router-link
              to="/products/NEW 新品"
              class="nav-link high-light"
            >
              NEW 新品
            </router-link>
            <router-link to="/products/上衣" class="nav-link">
              上衣
            </router-link>
            <router-link to="/products/裙裝" class="nav-link">
              裙裝
            </router-link>
            <router-link to="/products/褲裝" class="nav-link">
              褲裝
            </router-link>
          </div>
        </nav>
        <div class="collapse navbar-collapse flex-grow-0" id="navbartest">
          <div class="navbar-nav">
            <div class="nav-link d-flex align-items-center">
              <i class="material-icons md-18 me-2">favorite</i>
              <span>WISHLIST</span>
            </div>
            <div class="nav-link d-flex align-items-center">
              <i class="material-icons md-18 me-2">shopping_cart</i>
              <span>CART</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';
.navbar-light {
  .navbar-nav {
    .nav-link {
      position: relative;
      font-size: 0.875rem;
      color: $body-color;
      .active {
        color: rgba(0, 0, 0, 0.9);
      }
      &.high-light {
        color: $color-main;
      }
    }
  }
}
</style>
