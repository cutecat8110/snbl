<template>
  <div
    id="articleModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="articleModal"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="exampleModalLabel" class="modal-title">
            <span v-if="isNew">新增文章</span>
            <span v-else>編輯文章</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <section class="mb-4" ref="basic">
            <h5>文章資訊</h5>
            <div class="row g-3 p-2">
              <!-- 標題 -->
              <div class="col-12">
                <label for="title" class="form-label"
                  >標題
                  <span class="text-red">﹡</span>
                </label>
                <div
                  class="form-group position-relative"
                  :class="tempArticle.title ? 'inputClear' : ''"
                >
                  <input
                    ref="articleTitle"
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="tempArticle.title"
                  />
                  <button
                    v-if="tempArticle.title"
                    type="button"
                    class="btn-close
                    position-absolute top-50 end-0 translate-middle-y"
                    v-on:click="
                      tempArticle.title = '';
                      clearFocus('articleTitle');
                    "
                  ></button>
                </div>
              </div>
              <!-- 作者 -->
              <div class="col-6">
                <label for="title" class="form-label"
                  >作者
                  <span class="text-red">﹡</span>
                </label>
                <div
                  class="form-group position-relative"
                  :class="tempArticle.author ? 'inputClear' : ''"
                >
                  <input
                    ref="articleAuthor"
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="tempArticle.author"
                  />
                  <button
                    v-if="tempArticle.author"
                    type="button"
                    class="btn-close
                    position-absolute top-50 end-0 translate-middle-y"
                    v-on:click="
                      tempArticle.author = '';
                      clearFocus('articleAuthor');
                    "
                  ></button>
                </div>
              </div>
              <!-- 建立日期 -->
              <div class="col-6">
                <label for="create_at" class="form-label">文章建立日期</label>
                <div class="form-group ">
                  <input type="date" class="form-control" id="create_at" v-model="create_at" />
                </div>
              </div>
              <!-- 描述 -->
              <div class="col-12">
                <label for="title" class="form-label">描述 </label>
                <div
                  class="form-group position-relative"
                  :class="tempArticle.description ? 'inputClear' : ''"
                >
                  <input
                    ref="articleDescription"
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="tempArticle.description"
                  />
                  <button
                    v-if="tempArticle.description"
                    type="button"
                    class="btn-close
                    position-absolute top-50 end-0 translate-middle-y"
                    v-on:click="
                      tempArticle.description = '';
                      clearFocus('articleDescription');
                    "
                  ></button>
                </div>
              </div>
            </div>
          </section>
          <section class="mb-3" ref="articleImage">
            <h5>商品細節</h5>
            <div class="d-flex flex-wrap mt-3">
              <!-- 細節 -->
              <template v-if="tempArticle.articleImagesUrl">
                <div class="m-2" v-for="(image, key) in tempArticle.articleImagesUrl" :key="key">
                  <div
                    v-if="tempArticle.articleImagesUrl[key]"
                    class="border rounded upfile-wrapper"
                    v-on:click.prevent="tempArticle.articleImagesUrl[key] = ''"
                  >
                    <div
                      class="w-100 h-100 overflow-hidden
                    d-flex justify-content-center align-items-center mask"
                    >
                      <img class="img-fluid" :src="tempArticle.articleImagesUrl[key]" alt="" />
                    </div>
                  </div>
                  <label
                    v-else
                    :for="'articleImagesUrl' + key"
                    class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                  >
                    <input
                      :id="'articleImagesUrl' + key"
                      type="file"
                      class="d-none"
                      :ref="'articleImagesUrl' + key"
                      @change="uploadFile('articleImagesUrl' + key, 'articleImagesUrl', key)"
                    />
                    <i class="material-icons md-dark">file_upload</i>
                    <div class="fs-6 fw-normal text-gray-600">Upload</div>
                  </label>
                  <div class="form-label mt-2 text-center">
                    細節 {{ key + 1 }}
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </div>
                </div>
                <!-- 新增/刪除 -->
                <div class="m-2">
                  <template
                    v-if="
                      !tempArticle.articleImagesUrl.length ||
                        tempArticle.articleImagesUrl[tempArticle.articleImagesUrl.length - 1]
                    "
                  >
                    <button
                      type="button"
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      @click="tempArticle.articleImagesUrl.push('')"
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
                      @click="tempArticle.articleImagesUrl.pop()"
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
          <!-- 內文 -->
          <section class="mb-4" ref="isEnabled">
            <h5>內文</h5>
            <div class="row g-3 p-2">
              <div class="col">
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                ></ckeditor>
              </div>
            </div>
          </section>
          <!-- 公開狀態 -->
          <section class="mb-4" ref="isEnabled">
            <h5>公開狀態</h5>
            <div class="row g-3 p-2">
              <div class="col">
                <!-- 開啟 -->
                <label for="isEnabled1" class="d-inline-block py-2 me-2">
                  <input
                    id="isEnabled1"
                    class="form-check-input"
                    type="radio"
                    v-model="tempArticle.isPublic"
                    value="true"
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
                    v-model="tempArticle.isPublic"
                    value="false"
                  />
                  <span class="px-2">
                    關閉
                  </span>
                </label>
              </div>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary me-3" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import modalMixin from '@/mixins/modalMixin';

export default {
  inject: ['httpMessageState'],
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      status: {},
      modal: '',
      tempArticle: {
        tag: [''],
      },
      create_at: 0,
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
    };
  },
  mixins: [modalMixin],
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false,
        articleImagesUrl: this.article.articleImagesUrl || [],
      };
      [this.create_at] = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
    },
    'tempArticle.isPublic': {
      handler() {
        if (this.tempArticle.isPublic === 'true') {
          this.tempArticle.isPublic = true;
        } else if (this.tempArticle.isPublic === 'false') {
          this.tempArticle.isPublic = false;
        }
      },
      deep: true,
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
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
              this.tempArticle[item][index] = res.data.imageUrl;
            } else {
              this.tempArticle[item] = res.data.imageUrl;
            }
            this.$refs[ref].value = '';
            this.httpMessageState(res, status);
          } else {
            this.$refs[ref].value = '';
            this.httpMessageState(res, status);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_modal';

.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
