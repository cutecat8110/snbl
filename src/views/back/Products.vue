<template>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="container py-4">
      <div class="bg-white px-4 border">
        <div class="navbar py-3">
          <div class="container-fluid">
            <span class="navbar-brand">產品管理列表</span>
            <button
              class="btn-sm btn-primary d-flex align-items-center"
              @click="openModal('create')"
            >
              <i class="material-icons md-18">add</i>
              <span>新增</span>
            </button>
          </div>
        </div>
        <div class="table-responsive mb-3">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-gray-000">
              <tr>
                <th class="position-relative" width="128">分類</th>
                <th class="position-relative">產品名稱</th>
                <th class="position-relative">原價</th>
                <th class="position-relative">售價</th>
                <th class="position-relative" width="128">狀態</th>
                <th width="128">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="item.id">
                <td>{{ item.category }}</td>
                <td>
                  <router-link v-if="item.is_enabled" :to="{ path: `Product/${item.id}` }">{{
                    item.title
                  }}</router-link>
                  <span v-else>{{ item.title }}</span>
                </td>
                <td>{{ item.origin_price }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <div v-if="item.is_enabled" class="text-success d-flex align-items-center">
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
                      @click="openModal('edit', index)"
                    >
                      編輯
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm"
                      type="button"
                      @click="openModal('delete', index)"
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分頁 元件 -->
        <Pagination :pages="pagination" @emit-page="getData"></Pagination>
      </div>
    </div>
    <!-- 新增/編輯 元件 -->
    <ProductModal
      ref="ProductModal"
      :is-new="isNew"
      :tempProduct="tempProduct"
      @update-product="updateProduct"
    ></ProductModal>
    <!-- 刪除 元件 -->
    <DelModal
      ref="DelModal"
      :delItem="tempProduct.title"
      :origin="pageName"
      @del-item="deleteProduct"
    ></DelModal>
  </div>
</template>

<script>
import DelModal from '@/components/back/DelModal.vue'
import Pagination from '@/components/back/Pagination.vue'
import ProductModal from '@/components/back/ProductModal.vue'

export default {
  components: {
    DelModal,
    Pagination,
    ProductModal
  },
  inject: ['httpMessageState'],
  data() {
    return {
      whateverActivatesThisLink: false,
      pageName: '商品',
      isLoading: false,
      products: [],
      pagination: [],
      currentPage: 1,
      isNew: false,
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true
      this.currentPage = page
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http.get(url).then((res) => {
        this.products = res.data.products
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    },
    openModal(event, index) {
      if (event === 'create') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.ProductModal.openModal()
      } else if (event === 'edit') {
        this.tempProduct = { ...this.products[index] }
        this.isNew = false
        this.$refs.ProductModal.openModal()
      } else if (event === 'delete') {
        this.tempProduct = { ...this.products[index] }
        this.$refs.DelModal.openModal()
      }
    },
    updateProduct(item) {
      this.isLoading = true
      this.tempProduct = item
      this.tempProduct.imagesUrl = this.tempProduct.imagesUrl.filter(Boolean)
      this.tempProduct.modelImagesUrl = this.tempProduct.modelImagesUrl.filter(Boolean)
      this.tempProduct.detalImagesUrl = this.tempProduct.detalImagesUrl.filter(Boolean)
      this.tempProduct.is_enabled = Number(this.tempProduct.is_enabled)
      const clothSize = ['S', 'M', 'L', 'XL', 'F']
      this.tempProduct.clothSize = clothSize.filter(
        (val) => this.tempProduct.clothSize.indexOf(val) !== -1
      )

      const tempColors = []
      this.tempProduct.colors.forEach((tempcolor) => {
        if (Object.keys(tempcolor.name).length || Object.keys(tempcolor.colorChart).length) {
          tempColors.push(tempcolor)
        }
      })
      this.tempProduct.colors = tempColors

      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      let status = '新增產品'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
        status = '更新產品'
      }

      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        if (res.data.success) {
          this.getData(this.currentPage)
          this.isLoading = false
          this.$refs.ProductModal.hideModal()
          this.httpMessageState(res, status)
        } else {
          this.isLoading = false
          this.httpMessageState(res, status)
        }
      })
    },
    deleteProduct() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((res) => {
        this.getData(this.currentPage)
        this.isLoading = false
        this.httpMessageState(res, '刪除產品')
        this.$refs.DelModal.hideModal()
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_backTable';
</style>
