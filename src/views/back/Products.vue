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
                <th class="position-relative">分類</th>
                <th class="position-relative col-5">產品名稱</th>
                <th class="position-relative">原價</th>
                <th class="position-relative">售價</th>
                <th class="position-relative">狀態</th>
                <th class="col-1">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="item.id">
                <td>{{ item.category }}</td>
                <td>
                  <router-link :to="{ path: `Product/${item.id}` }">{{ item.title }}</router-link>
                </td>
                <td class="text-end">{{ item.origin_price }}</td>
                <td class="text-end">{{ item.price }}</td>
                <td>
                  <div class="text-success d-flex align-items-center" v-if="item.is_enabled">
                    <div class="circle bg-success me-2"></div>
                    <span>啟用 </span>
                  </div>
                  <span class="d-flex align-items-center" v-else>
                    <div class="circle bg-gray-300 me-2"></div>
                    <span>關閉 </span>
                  </span>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="openModal('edit', index)"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
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
      :is-new="isNew"
      :tempProduct="tempProduct"
      @update-product="updateProduct"
      ref="ProductModal"
    ></ProductModal>
    <!-- 刪除 元件 -->
    <DelModal @del-item="deleteProduct" ref="DelModal"></DelModal>
  </div>
</template>

<script>
import DelModal from '@/components/back/DelModal.vue';
import Pagination from '@/components/back/Pagination.vue';
import ProductModal from '@/components/back/ProductModal.vue';

export default {
  components: {
    DelModal,
    Pagination,
    ProductModal,
  },
  inject: ['httpMessageState'],
  data() {
    return {
      isLoading: false,
      products: [],
      pagination: [],
      currentPage: 1,
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      });
    },
    openModal(event, index) {
      if (event === 'create') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.ProductModal.openModal();
      } else if (event === 'edit') {
        this.tempProduct = { ...this.products[index] };
        this.isNew = false;
        this.$refs.ProductModal.openModal();
      } else if (event === 'delete') {
        this.tempProduct = { ...this.products[index] };
        this.$refs.DelModal.openModal();
      }
    },
    updateProduct(item) {
      this.isLoading = true;
      this.tempProduct = item;
      this.tempProduct.imagesUrl = this.tempProduct.imagesUrl.filter(Boolean);
      this.tempProduct.modelImagesUrl = this.tempProduct.modelImagesUrl.filter(Boolean);
      this.tempProduct.detalImagesUrl = this.tempProduct.detalImagesUrl.filter(Boolean);
      const clothSize = ['S', 'M', 'L', 'XL', 'F'];
      this.tempProduct.clothSize = clothSize.filter(
        (val) => this.tempProduct.clothSize.indexOf(val) !== -1,
      );

      const tempColors = [];
      this.tempProduct.colors.forEach((tempcolor) => {
        if (Object.keys(tempcolor.name).length || Object.keys(tempcolor.colorChart).length) {
          tempColors.push(tempcolor);
        }
      });
      this.tempProduct.colors = tempColors;

      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      let status = '新增產品';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
        status = '更新產品';
      }
      const productComponent = this.$refs.ProductModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        if (res.data.success) {
          this.getData(this.currentPage);
          this.isLoading = false;
          productComponent.hideModal();
          this.httpMessageState(res, status);
        } else {
          this.isLoading = false;
          this.httpMessageState(res, status);
        }
      });
    },
    deleteProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((res) => {
        this.getData(this.currentPage);
        this.isLoading = false;
        this.httpMessageState(res, '刪除產品');
        const delComponent = this.$refs.DelModal;
        delComponent.hideModal();
      });
    },
  },
  created() {
    this.getData();
    // const x = ['IdA', 'idB', 'IdC', 'IdD', 'IdE'];
    // const y = ['idB', 'IdE', 'IdF'];

    // const z = x.filter((val) => y.indexOf(val) !== -1);

    // console.log(z);
  },
};
</script>
