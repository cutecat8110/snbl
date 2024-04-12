<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li :class="{ disabled: pages.current_page === 1 }" class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only"></span>
        </a>
      </li>

      <li
        v-for="(item, index) in pages.total_pages"
        :key="index"
        :class="{ active: item === pages.current_page }"
        class="page-item"
      >
        <span v-if="item === pages.current_page" class="page-link">{{ item }}</span>
        <a v-else class="page-link" href="#" @click.prevent="emitPage(item)">{{ item }}</a>
      </li>

      <li :class="{ disabled: pages.current_page === pages.total_pages }" class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only"></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    emitPage(item) {
      this.$emit('emit-page', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-item.active .page-link {
  cursor: default;
}
</style>
