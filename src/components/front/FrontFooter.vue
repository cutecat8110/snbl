<template>
  <footer class="py-2">
    <div class="container">
      <router-link to="/login">
        <i class="material-icons md-18">settings</i>
      </router-link>
      Copyright © 2021 僅供練習使用
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_variable';

footer {
  border-top: 1px dashed $gray-250;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
