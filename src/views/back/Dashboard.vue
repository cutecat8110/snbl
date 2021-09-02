<template>
  <nav class="navbar navbar-expand fixed-top navbar-dark bg-dark shadow-sm">
    <div class="container-xxl">
      <div class="navbar-brand user-select-none">後台</div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <li class="nav-item">
            <router-link :to="{ name: 'BackProducts' }" class="nav-link">產品管理列表</router-link>
          </li>
        </ul>
        <router-link :to="{ name: 'Front' }" class="btn btn-outline-secondary btn-sm btn-oblong"
          >回到前台</router-link
        >
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>
