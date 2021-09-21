<template>
  <div class="front">
    <header class="fixed-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <router-link to="/">
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
            <div class="navbar-nav">
              <router-link to="/" class="nav-link">首頁</router-link>
              <router-link to="/products" class="nav-link">所有商品</router-link>
              <router-link to="/products" class="nav-link">上衣</router-link>
              <router-link to="/products" class="nav-link">褲裝</router-link>
              <router-link to="/products" class="nav-link">群裝</router-link>
              <router-link to="/products" class="nav-link">秋季新品</router-link>
            </div>
          </div>
          <i class="material-icons">cloud_upload</i>
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
          <router-link to="/login">
            <i class="material-icons">settings</i>
          </router-link>
        </div>
      </footer>
    </div>
  </div>
</template>
