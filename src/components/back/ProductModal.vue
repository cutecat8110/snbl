<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增商品</span>
            <span v-else>編輯商品</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <nav class=" position-relative">
          <div class="position-absolute" style="z-index: 1056">
            <h6 class="text-gray-300 text-center py-2 mb-0">
              This page
            </h6>
            <ul class="list-group fs-6 fw-normal border-start">
              <li
                class="list-group-item border-0 text-gray-600"
                v-for="(item, index) in nav"
                :key="index"
              >
                <a href="#" class="text-reset" v-on:click.prevent="subNav(item.ref)">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="modal-body modal-xl" ref="modalBody">
          <!-- 基本資訊 -->
          <section class="mb-4" ref="basic">
            <h5>基本資訊</h5>
            <div class="row g-3 p-2">
              <!-- 商品名稱 -->
              <div class="col-12">
                <label for="title" class="form-label"
                  >商品名稱
                  <span class="text-red">﹡</span>
                </label>
                <div
                  class="form-group position-relative"
                  :class="product.title ? 'inputClear' : ''"
                >
                  <input
                    ref="productTitle"
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="product.title"
                  />
                  <button
                    v-if="product.title"
                    type="button"
                    class="btn-close
                    position-absolute top-50 end-0 translate-middle-y"
                    v-on:click="
                      product.title = '';
                      clearFocus('productTitle');
                    "
                  ></button>
                </div>
              </div>
              <!-- 分類 -->
              <div class="col-6">
                <label for="category" class="form-label">
                  分類
                  <span class="text-red">﹡</span>
                </label>
                <select class="form-select" id="category" v-model="product.category">
                  <option value="" disabled>請選擇</option>
                  <option v-for="(item, index) in category" :key="index" :value="item">
                    {{ item }}
                  </option>
                </select>
              </div>
              <!-- 單位 -->
              <div class="col-6">
                <label for="unit" class="form-label">
                  單位
                  <span class="text-red">﹡</span>
                </label>
                <select class="form-select" id="unit" v-model="product.unit">
                  <option value="" disabled>請選擇</option>
                  <option v-for="(item, index) in unit" :key="index" :value="item">
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
          </section>
          <!-- 銷售 -->
          <section class="mb-4" ref="sales">
            <h5>銷售</h5>
            <div class="row g-3 p-2">
              <!-- 原價 -->
              <div class="col-md-6">
                <label for="origin_price" class="form-label">
                  原價
                  <span class="text-red">﹡</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text bg-light">NT$</span>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入"
                    v-model.number="product.origin_price"
                  />
                </div>
              </div>
              <!-- 售價 -->
              <div class="col-md-6">
                <label for="price" class="form-label">
                  售價
                  <span class="text-red">﹡</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text bg-light">NT$</span>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入"
                    v-model.number="product.price"
                  />
                </div>
              </div>
              <!-- 尺寸 -->
              <div class="col-md-12">
                <label class="form-label">尺寸</label>
                <div class="d-flex flex-wrap">
                  <label
                    class="d-inline-block py-2 me-2"
                    v-for="(item, index) in clothSize"
                    :key="index"
                    :for="'clothSize' + item"
                  >
                    <input
                      :id="'clothSize' + item"
                      class="form-check-input"
                      type="checkbox"
                      v-model="product.clothSize"
                      :value="item"
                    />
                    <span class="px-2">
                      {{ item }}
                    </span>
                  </label>
                </div>
              </div>
              <!-- 顏色 -->
              <div class="col-md-12" v-if="product.colors">
                <label class="form-label">顏色</label>
                <div class="mb-3" v-for="(item, index) in product.colors" :key="index">
                  <div class="d-flex flex-wrap">
                    <!-- 色卡 -->
                    <div
                      v-if="item.colorChart"
                      class="w-100 colorReveal border border-bottom-0 rounded-top"
                      :style="{ backgroundColor: item.colorChart }"
                    ></div>
                    <!-- 色名 -->
                    <div class="w-50">
                      <div
                        class="form-group position-relative"
                        :class="item.name ? 'inputClear' : ''"
                      >
                        <input
                          :id="'colors' + index"
                          :ref="'colors' + index"
                          type="text"
                          class="form-control"
                          :class="item.colorChart ? 'colorsName' : 'name'"
                          placeholder="請輸入色名，例如：白色"
                          v-model="item.name"
                        />
                        <button
                          v-if="item.name"
                          type="button"
                          class="btn-close position-absolute top-50 end-0 translate-middle-y"
                          v-on:click="
                            product.colors[index].name = '';
                            clearFocus('colors' + index);
                          "
                        ></button>
                      </div>
                    </div>
                    <!-- 色票 -->
                    <div class="w-50">
                      <div
                        class="form-group position-relative"
                        :class="item.colorChart ? 'inputClear' : ''"
                      >
                        <input
                          :id="'colorChart' + index"
                          :ref="'colorChart' + index"
                          type="text"
                          class="form-control "
                          :class="item.colorChart ? 'colorChart' : 'chart'"
                          placeholder="請輸入色票，例如：#FFFFF"
                          v-model="item.colorChart"
                        />
                        <button
                          v-if="item.colorChart"
                          type="button"
                          class="btn-close position-absolute top-50 end-0 translate-middle-y"
                          v-on:click="
                            product.colors[index].colorChart = '';
                            clearFocus('colorChart' + index);
                          "
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 新增/刪除 -->
                <button
                  v-if="
                    !product.colors.length ||
                      Object.keys(product.colors[product.colors.length - 1].name).length ||
                      Object.keys(product.colors[product.colors.length - 1].colorChart).length
                  "
                  type="button"
                  class="d-block bg-light border rounded
                        upfile-wrapper upload d-flex btn-size"
                  @click="colorsFocus()"
                >
                  <i class="material-icons md-dark ">add</i>
                  <span class="fs-6 fw-normal text-gray-600">新增</span>
                </button>
                <button
                  v-else
                  type="button"
                  class="d-block bg-light border rounded
                        upfile-wrapper upload d-flex btn-size"
                  @click="product.colors.pop()"
                >
                  <i class="material-icons md-dark">clear</i>
                  <span class="fs-6 fw-normal text-gray-600">刪除</span>
                </button>
              </div>
            </div>
          </section>
          <!-- 商品圖 -->
          <section class="mb-3" ref="productPicture">
            <h5>商品圖</h5>
            <div class="d-flex flex-wrap mt-3">
              <!-- 封面照片 -->
              <div class="m-2">
                <label
                  v-if="!product.imageUrl"
                  for="fileInput"
                  class="d-block bg-light border rounded upfile-wrapper upload
                  d-flex"
                >
                  <input
                    id="fileInput"
                    type="file"
                    class="d-none"
                    ref="fileInput"
                    @change="uploadFile('fileInput', 'imageUrl')"
                  />
                  <i class="material-icons md-dark">file_upload</i>
                  <div class="fs-6 fw-normal text-gray-600">Upload</div>
                </label>
                <div
                  v-else
                  class="border rounded upfile-wrapper"
                  v-on:click.prevent="product.imageUrl = ''"
                >
                  <div
                    class="w-100 h-100 overflow-hidden
                    d-flex justify-content-center align-items-center mask"
                  >
                    <img class="img-fluid" :src="product.imageUrl" alt="" />
                  </div>
                </div>
                <div class="form-label mt-2 text-center">
                  封面照片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </div>
              </div>
              <!-- 圖片 -->
              <template v-if="product.imagesUrl">
                <div class="m-2" v-for="(image, key) in product.imagesUrl" :key="key">
                  <div
                    v-if="product.imagesUrl[key]"
                    class="border rounded upfile-wrapper"
                    v-on:click.prevent="product.imagesUrl[key] = ''"
                  >
                    <div
                      class="w-100 h-100 overflow-hidden
                    d-flex justify-content-center align-items-center mask"
                    >
                      <img class="img-fluid" :src="product.imagesUrl[key]" alt="" />
                    </div>
                  </div>

                  <label
                    v-else
                    :for="'imagesUrl' + key"
                    class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                  >
                    <input
                      :id="'imagesUrl' + key"
                      type="file"
                      class="d-none"
                      :ref="'imagesUrl' + key"
                      @change="uploadFile('imagesUrl' + key, 'imagesUrl', key)"
                    />
                    <i class="material-icons md-dark">file_upload</i>
                    <div class="fs-6 fw-normal text-gray-600">Upload</div>
                  </label>
                  <div class="form-label mt-2 text-center">
                    圖片 {{ key + 1 }}
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </div>
                </div>
                <!-- 新增/刪除 -->
                <div class="m-2">
                  <template
                    v-if="
                      !product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]
                    "
                  >
                    <button
                      type="button"
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      @click="product.imagesUrl.push('')"
                    >
                      <i class="material-icons md-dark">add</i>
                      <div class="fs-6 fw-normal text-gray-600">Add</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">
                      新增
                    </div>
                  </template>
                  <template v-else>
                    <button
                      type="button"
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      @click="product.imagesUrl.pop()"
                    >
                      <i class="material-icons md-dark">delete</i>
                      <div class="fs-6 fw-normal text-gray-600">Delete</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">
                      刪除
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </section>
          <!-- 展示圖 -->
          <section class="mb-3" ref="modelPicture">
            <h5>展示圖</h5>
            <div class="d-flex flex-wrap mt-3">
              <!-- 形象封面 -->
              <div class="m-2">
                <label
                  v-if="!product.modelImageUrl"
                  for="modelImageUrl"
                  class="d-block bg-light border rounded upfile-wrapper upload
                  d-flex"
                >
                  <input
                    id="modelImageUrl"
                    type="file"
                    class="d-none"
                    ref="modelImageUrl"
                    @change="uploadFile('modelImageUrl', 'modelImageUrl')"
                  />
                  <i class="material-icons md-dark">file_upload</i>
                  <div class="fs-6 fw-normal text-gray-600">Upload</div>
                </label>
                <div
                  v-else
                  class="border rounded upfile-wrapper"
                  v-on:click.prevent="product.modelImageUrl = ''"
                >
                  <div
                    class="w-100 h-100 overflow-hidden
                    d-flex justify-content-center align-items-center mask"
                  >
                    <img class="img-fluid" :src="product.modelImageUrl" alt="" />
                  </div>
                </div>
                <div class="form-label mt-2 text-center">
                  形象封面
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </div>
              </div>
              <!-- 模特展示 -->
              <template v-if="product.modelImagesUrl">
                <div class="m-2" v-for="(image, key) in product.modelImagesUrl" :key="key">
                  <div
                    v-if="product.modelImagesUrl[key]"
                    class="border rounded upfile-wrapper"
                    v-on:click.prevent="product.modelImagesUrl[key] = ''"
                  >
                    <div
                      class="w-100 h-100 overflow-hidden
                    d-flex justify-content-center align-items-center mask"
                    >
                      <img class="img-fluid" :src="product.modelImagesUrl[key]" alt="" />
                    </div>
                  </div>
                  <label
                    v-else
                    :for="'modelImagesUrl' + key"
                    class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                  >
                    <input
                      :id="'modelImagesUrl' + key"
                      type="file"
                      class="d-none"
                      :ref="'modelImagesUrl' + key"
                      @change="uploadFile('modelImagesUrl' + key, 'modelImagesUrl', key)"
                    />
                    <i class="material-icons md-dark">file_upload</i>
                    <div class="fs-6 fw-normal text-gray-600">Upload</div>
                  </label>
                  <div class="form-label mt-2 text-center">
                    模特展示{{ key + 1 }}
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </div>
                </div>
                <!-- 新增/刪除 -->
                <div class="m-2">
                  <template
                    v-if="
                      !product.modelImagesUrl.length ||
                        product.modelImagesUrl[product.modelImagesUrl.length - 1]
                    "
                  >
                    <button
                      type="button"
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      @click="product.modelImagesUrl.push('')"
                    >
                      <i class="material-icons md-dark">add</i>
                      <div class="fs-6 fw-normal text-gray-600">Add</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">
                      新增
                    </div>
                  </template>
                  <template v-else>
                    <button
                      type="button"
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      @click="product.modelImagesUrl.pop()"
                    >
                      <i class="material-icons md-dark">delete</i>
                      <div class="fs-6 fw-normal text-gray-600">Delete</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">
                      刪除
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </section>
          <!-- 商品細節 -->
          <section class="mb-3" ref="productDetail">
            <h5>商品細節</h5>
            <div class="d-flex flex-wrap mt-3">
              <!-- 細節 -->
              <template v-if="product.detalImagesUrl">
                <div class="m-2" v-for="(image, key) in product.detalImagesUrl" :key="key">
                  <div
                    v-if="product.detalImagesUrl[key]"
                    class="border rounded upfile-wrapper"
                    v-on:click.prevent="product.detalImagesUrl[key] = ''"
                  >
                    <div
                      class="w-100 h-100 overflow-hidden
                    d-flex justify-content-center align-items-center mask"
                    >
                      <img class="img-fluid" :src="product.detalImagesUrl[key]" alt="" />
                    </div>
                  </div>
                  <label
                    v-else
                    :for="'detalImagesUrl' + key"
                    class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                  >
                    <input
                      :id="'detalImagesUrl' + key"
                      type="file"
                      class="d-none"
                      :ref="'detalImagesUrl' + key"
                      @change="uploadFile('detalImagesUrl' + key, 'detalImagesUrl', key)"
                    />
                    <i class="material-icons md-dark">file_upload</i>
                    <div class="fs-6 fw-normal text-gray-600">Upload</div>
                  </label>
                  <div class="form-label mt-2 text-center">
                    細節{{ key + 1 }}
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </div>
                </div>
                <!-- 新增/刪除 -->
                <div class="m-2">
                  <template
                    v-if="
                      !product.detalImagesUrl.length ||
                        product.detalImagesUrl[product.detalImagesUrl.length - 1]
                    "
                  >
                    <button
                      type="button"
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      @click="product.detalImagesUrl.push('')"
                    >
                      <i class="material-icons md-dark">add</i>
                      <div class="fs-6 fw-normal text-gray-600">Add</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">
                      新增
                    </div>
                  </template>
                  <template v-else>
                    <button
                      type="button"
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      @click="product.detalImagesUrl.pop()"
                    >
                      <i class="material-icons md-dark">delete</i>
                      <div class="fs-6 fw-normal text-gray-600">Delete</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">
                      刪除
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </section>
          <!-- 詳細資訊 -->
          <section class="mb-3" ref="productInformation">
            <h5>詳細資訊</h5>
            <div class="d-flex flex-wrap mt-3">
              <!-- 款號/尺碼/模特/試穿/面料 -->
              <div class="m-2" v-for="(item, index) in productInformation" :key="index">
                <label
                  v-if="!product[item.ref]"
                  :for="item.ref"
                  class="d-block bg-light border rounded upfile-wrapper upload
                  d-flex"
                >
                  <input
                    :id="item.ref"
                    type="file"
                    class="d-none"
                    :ref="item.ref"
                    @change="uploadFile('item.ref', 'item.ref')"
                  />
                  <i class="material-icons md-dark">file_upload</i>
                  <div class="fs-6 fw-normal text-gray-600">Upload</div>
                </label>
                <div
                  v-else
                  class="border rounded upfile-wrapper"
                  v-on:click.prevent="product[item.ref] = ''"
                >
                  <div
                    class="w-100 h-100 overflow-hidden
                    d-flex justify-content-center align-items-center mask"
                  >
                    <img class="img-fluid" :src="product[item.ref]" alt="" />
                  </div>
                </div>
                <div class="form-label mt-2 text-center">
                  {{ item.name }}
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </div>
              </div>
            </div>
          </section>
          <!-- 上架狀態 -->
          <section class="mb-4" ref="isEnabled">
            <h5>上架狀態</h5>
            <div class="row g-3 p-2">
              <div class="col">
                <!-- 開啟 -->
                <label for="isEnabled1" class="d-inline-block py-2 me-2">
                  <input
                    id="isEnabled1"
                    class="form-check-input"
                    type="radio"
                    v-model="product.is_enabled"
                    value="1"
                  />
                  <span class="px-2">
                    開啟
                  </span>
                </label>
                <!-- 關閉 -->
                <label for="isEnabled0" class="d-inline-block py-2 me-2">
                  <input
                    id="isEnabled0"
                    class="form-check-input"
                    type="radio"
                    v-model="product.is_enabled"
                    value="0"
                  />
                  <span class="px-2">
                    關閉
                  </span>
                </label>
              </div>
            </div>
          </section>
        </div>
        <div class="modal-footer bg-white" style="z-index: 1057">
          <button type="button" class="btn btn-outline-secondary me-3" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', this.product)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  mixins: [modalMixin],
  inject: ['httpMessageState'],
  emits: ['update-product'],
  props: {
    tempProduct: {
      default() {
        return {
          imagesUrl: [],
        };
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      waitProcess: false,
      status: {},
      product: {},
      category: ['上衣', '裙裝', '褲裝', '配飾', '套裝', '新品'],
      unit: ['套', '件'],
      clothSize: ['S', 'M', 'L', 'XL', 'F'],
      productInformation: [
        { name: '款號', ref: 'infolImageUrl' },
        { name: '尺碼', ref: 'sizeImageUrl' },
        { name: '模特', ref: 'modelInfoImageUrl' },
        { name: '試穿', ref: 'tryOnImageUrl' },
        { name: '面料', ref: 'tabricImageUrl' },
      ],
      nav: [
        { name: '基本資訊', ref: 'basic' },
        { name: '銷售', ref: 'sales' },
        { name: '商品圖', ref: 'productPicture' },
        { name: '展示圖', ref: 'modelPicture' },
        { name: '商品細節', ref: 'productDetail' },
        { name: '詳細資訊', ref: 'productInformation' },
        { name: '上架狀態', ref: 'isEnabled' },
      ],
    };
  },
  watch: {
    tempProduct() {
      this.product = JSON.parse(JSON.stringify(this.tempProduct));
      const productData = [
        'imageUrl',
        'unit',
        'category',
        'modelImageUrl',
        'infolImageUrl',
        'sizeImageUrl',
        'modelInfoImageUrl',
        'tabricImageUrl',
        'tryOnImageUrl',
      ];
      const productArray = ['imagesUrl', 'clothSize', 'colors', 'modelImagesUrl', 'detalImagesUrl'];
      productData.forEach((item) => {
        if (!this.product[item]) {
          this.product[item] = '';
        }
      });
      productArray.forEach((item) => {
        if (!this.product[item]) {
          this.product[item] = [];
        }
      });
      if (!this.product.is_enabled) {
        this.product.is_enabled = 1;
      }
    },
  },
  methods: {
    uploadFile(ref, item, index) {
      const uploadedFile = this.$refs[ref].files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.status.fileUploading = true;
      const status = '圖片上傳';
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.status.fileUploading = false;
          if (res.data.success) {
            if (index || index === 0) {
              this.product[item][index] = res.data.imageUrl;
            } else {
              this.product[item] = res.data.imageUrl;
            }
            this.$refs[ref].value = '';
            this.httpMessageState(res, status);
          } else {
            this.$refs[ref].value = '';
            this.httpMessageState(res, status);
          }
        });
    },
    colorsFocus() {
      this.product.colors.push({ name: '', colorChart: '' });
      this.waitProcess = true;
    },
    subNav(item) {
      this.$refs.modalBody.scrollTo(0, this.$refs[item].offsetTop - 24);
    },
    clearFocus(ref) {
      this.$refs[ref].focus();
    },
  },
  updated() {
    if (this.waitProcess) {
      this.$refs[`colors${this.product.colors.length - 1}`].focus();
      this.waitProcess = false;
    }
  },
};
</script>
