<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          href="#"
          class="page-link"
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
        class="page-item"
        :class="{ active: item === pages.current_page }"
      >
        <span class="page-link" v-if="item === pages.current_page">{{ item }}</span>
        <a href="#" class="page-link" v-else @click.prevent="emitPage(item)">{{ item }}</a>
      </li>

      <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }">
        <a
          href="#"
          class="page-link"
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
      this.$emit('emit-page', item);
    },
  },
};
</script>
