<template>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="container py-4">
      <div class="bg-white px-4 border">
        <div class="navbar py-3">
          <div class="container-fluid">
            <span class="navbar-brand">文章管理</span>
            <button class="btn-sm btn-primary d-flex align-items-center" @click="openModal('new')">
              <i class="material-icons md-18">add</i>
              <span>新增</span>
            </button>
          </div>
        </div>
        <div class="table-responsive mb-3">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-gray-000">
              <tr>
                <th class="position-relative" style="width: 200px">標題</th>
                <th class="position-relative" style="width: 200px">作者</th>
                <th class="position-relative">描述</th>
                <th class="position-relative" style="width: 100px">建立時間</th>
                <th class="position-relative" style="width: 100px">是否公開</th>
                <th class="position-relative" style="width: 128px">編輯</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, key) in articles" :key="key">
                <tr v-if="articles.length" :class="{ 'text-gray-500 fw-light': !item.isPublic }">
                  <td>{{ item.title }}</td>
                  <td>{{ item.author }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ $filters.date(item.create_at) }}</td>
                  <td>
                    <div v-if="item.isPublic" class="text-success d-flex align-items-center">
                      <div class="circle bg-success me-2"></div>
                      <span>已上架 </span>
                    </div>
                    <span v-else class="d-flex align-items-center">
                      <div class="circle bg-gray-300 me-2"></div>
                      <span>關閉 </span>
                    </span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-primary btn-sm"
                        type="button"
                        @click="openModal('edit', item)"
                      >
                        編輯
                      </button>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        type="button"
                        @click="openModal('delete', item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <Pagination :pages="pagination" @emit-page="getArticles"></Pagination>
      </div>
    </div>
    <!-- 編輯 元件 -->
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    ></ArticleModal>
    <!-- 刪除 元件 -->
    <DelModal
      ref="delModal"
      :delItem="tempArticle.title"
      :origin="pageName"
      @del-item="delArticle"
    ></DelModal>
  </div>
</template>

<script>
import ArticleModal from '@/components/back/ArticleModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import Pagination from '@/components/back/Pagination.vue'

export default {
  components: {
    DelModal,
    Pagination,
    ArticleModal
  },
  inject: ['httpMessageState'],
  data() {
    return {
      pageName: '文章',
      isLoading: false,
      pagination: [],
      currentPage: 1,
      isNew: false,
      articles: [],
      tempArticle: {
        id: ''
      }
    }
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true
      this.currentPage = page
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
      this.$http.get(url).then((res) => {
        this.articles = res.data.articles
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    },
    openModal(event, item) {
      if (event === 'new') {
        this.isNew = true
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.$refs.articleModal.openModal()
      } else if (event === 'edit') {
        this.isNew = false
        this.isLoading = true
        const { id } = item
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${id}`
        this.$http.get(url).then((res) => {
          this.tempArticle = res.data.article
          this.isLoading = false
          this.$refs.articleModal.openModal()
        })
      } else if (event === 'delete') {
        this.tempArticle = { ...item }
        this.$refs.delModal.openModal()
      }
    },
    updateArticle(item) {
      this.isLoading = true
      this.tempArticle = item
      this.tempArticle.articleImagesUrl = this.tempArticle.articleImagesUrl.filter(Boolean)
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      let status = '新增文章'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
        httpMethod = 'put'
        status = '更新文章'
      }
      this.$http[httpMethod](api, { data: this.tempArticle }).then((res) => {
        if (res.data.success) {
          this.getArticles(this.currentPage)
          this.isLoading = false
          this.$refs.articleModal.hideModal()
          this.httpMessageState(res, status)
        } else {
          this.isLoading = false
          this.httpMessageState(res, status)
        }
      })
    },
    delArticle() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
      this.$http.delete(url).then((res) => {
        this.getArticles(this.currentPage)
        this.isLoading = false
        this.httpMessageState(res, '刪除文章')
        this.$refs.delModal.hideModal()
      })
    }
  },
  created() {
    this.getArticles()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_backTable';
</style>
