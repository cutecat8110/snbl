<template>
  <header class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/logo.png" alt="logo.png" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Products' }" class="nav-link">所有商品</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Products' }" class="nav-link">上衣</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Products' }" class="nav-link">褲裝</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Products' }" class="nav-link">群裝</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Products' }" class="nav-link">秋季新品</router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <router-link :to="{ name: 'Cart' }">
            <span class="material-icons">favorite</span>
          </router-link>
          <router-link :to="{ name: 'Cart' }">
            <span class="material-icons">shopping_cart</span>
          </router-link>
        </div>
      </div>
    </nav>
    <menu-icon class="search" />
  </header>
  <div class="main-wrapper">
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="container py-3 d-flex align-items-center">
        <router-link :to="{ name: 'Back' }">
          <span class="material-icons">settings</span>
        </router-link>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
</style>
