<template>
  <div
    id="articleModal"
    ref="modal"
    class="modal fade"
    aria-hidden="true"
    aria-labelledby="articleModal"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h3 id="exampleModalLabel" class="modal-title">
            <span v-if="isNew">新增文章</span>
            <span v-else>編輯文章</span>
          </h3>
          <button
            class="btn-close"
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <section ref="basic" class="mb-4">
            <h5>文章資訊</h5>
            <div class="row g-3 p-2">
              <!-- 標題 -->
              <div class="col-12">
                <label class="form-label" for="title"
                  >標題
                  <span class="text-red">﹡</span>
                </label>
                <div
                  :class="tempArticle.title ? 'inputClear' : ''"
                  class="form-group position-relative"
                >
                  <input
                    id="title"
                    ref="articleTitle"
                    v-model="tempArticle.title"
                    class="form-control"
                    type="text"
                    placeholder="請輸入"
                  />
                  <button
                    v-if="tempArticle.title"
                    v-on:click="
                      () => {
                        tempArticle.title = ''
                        clearFocus('articleTitle')
                      }
                    "
                    class="btn-close position-absolute top-50 end-0 translate-middle-y"
                    type="button"
                  ></button>
                </div>
              </div>
              <!-- 作者 -->
              <div class="col-6">
                <label class="form-label" for="title"
                  >作者
                  <span class="text-red">﹡</span>
                </label>
                <div
                  :class="tempArticle.author ? 'inputClear' : ''"
                  class="form-group position-relative"
                >
                  <input
                    id="title"
                    ref="articleAuthor"
                    v-model="tempArticle.author"
                    class="form-control"
                    type="text"
                    placeholder="請輸入"
                  />
                  <button
                    v-if="tempArticle.author"
                    v-on:click="
                      () => {
                        tempArticle.author = ''
                        clearFocus('articleAuthor')
                      }
                    "
                    class="btn-close position-absolute top-50 end-0 translate-middle-y"
                    type="button"
                  ></button>
                </div>
              </div>
              <!-- 建立日期 -->
              <div class="col-6">
                <label class="form-label" for="create_at">文章建立日期</label>
                <div class="form-group">
                  <input id="create_at" v-model="create_at" class="form-control" type="date" />
                </div>
              </div>
              <!-- 描述 -->
              <div class="col-12">
                <label class="form-label" for="title">描述 </label>
                <div
                  :class="tempArticle.description ? 'inputClear' : ''"
                  class="form-group position-relative"
                >
                  <input
                    id="title"
                    ref="articleDescription"
                    v-model="tempArticle.description"
                    class="form-control"
                    type="text"
                    placeholder="請輸入"
                  />
                  <button
                    v-if="tempArticle.description"
                    v-on:click="
                      () => {
                        tempArticle.description = ''
                        clearFocus('articleDescription')
                      }
                    "
                    class="btn-close position-absolute top-50 end-0 translate-middle-y"
                    type="button"
                  ></button>
                </div>
              </div>
            </div>
          </section>
          <section ref="articleImage" class="mb-3">
            <h5>商品細節</h5>
            <div class="d-flex flex-wrap mt-3">
              <!-- 細節 -->
              <template v-if="tempArticle.articleImagesUrl">
                <div v-for="(image, key) in tempArticle.articleImagesUrl" :key="key" class="m-2">
                  <div
                    v-if="tempArticle.articleImagesUrl[key]"
                    v-on:click.prevent="tempArticle.articleImagesUrl[key] = ''"
                    class="border rounded upfile-wrapper"
                  >
                    <div
                      class="w-100 h-100 overflow-hidden d-flex justify-content-center align-items-center mask"
                    >
                      <img class="img-fluid" :src="tempArticle.articleImagesUrl[key]" alt="" />
                    </div>
                  </div>
                  <label
                    v-else
                    class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                    :for="'articleImagesUrl' + key"
                  >
                    <input
                      :id="'articleImagesUrl' + key"
                      :ref="'articleImagesUrl' + key"
                      class="d-none"
                      type="file"
                      @change="uploadFile('articleImagesUrl' + key, 'articleImagesUrl', key)"
                    />
                    <i class="material-icons md-dark">file_upload</i>
                    <div class="fs-6 fw-normal text-gray-600">Upload</div>
                  </label>
                  <div class="form-label mt-2 text-center">
                    細節 {{ key + 1 }}
                    <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
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
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      type="button"
                      @click="tempArticle.articleImagesUrl.push('')"
                    >
                      <i class="material-icons md-dark">add</i>
                      <div class="fs-6 fw-normal text-gray-600">Add</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">新增</div>
                  </template>
                  <template v-else>
                    <button
                      class="d-block bg-light border rounded upfile-wrapper upload d-flex"
                      type="button"
                      @click="tempArticle.articleImagesUrl.pop()"
                    >
                      <i class="material-icons md-dark">delete</i>
                      <div class="fs-6 fw-normal text-gray-600">Delete</div>
                    </button>
                    <div class="form-label mt-2 d-block text-center">刪除</div>
                  </template>
                </div>
              </template>
            </div>
          </section>
          <!-- 內文 -->
          <section ref="isEnabled" class="mb-4">
            <h5>內文</h5>
            <div class="row g-3 p-2">
              <div class="col">
                <ckeditor
                  v-model="tempArticle.content"
                  :config="editorConfig"
                  :editor="editor"
                ></ckeditor>
              </div>
            </div>
          </section>
          <!-- 公開狀態 -->
          <section ref="isEnabled" class="mb-4">
            <h5>公開狀態</h5>
            <div class="row g-3 p-2">
              <div class="col">
                <!-- 開啟 -->
                <label class="d-inline-block py-2 me-2" for="isEnabled1">
                  <input
                    id="isEnabled1"
                    v-model="tempArticle.isPublic"
                    class="form-check-input"
                    type="radio"
                    value="true"
                  />
                  <span class="px-2"> 開啟 </span>
                </label>
                <!-- 關閉 -->
                <label class="d-inline-block py-2 me-2" for="isEnabled0">
                  <input
                    id="isEnabled0"
                    v-model="tempArticle.isPublic"
                    class="form-check-input"
                    type="radio"
                    value="false"
                  />
                  <span class="px-2"> 關閉 </span>
                </label>
              </div>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary me-3" type="button" data-bs-dismiss="modal">
            取消
          </button>
          <button
            class="btn btn-primary"
            type="button"
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import modalMixin from '@/mixins/modalMixin'

export default {
  inject: ['httpMessageState'],
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      status: {},
      modal: '',
      tempArticle: {
        tag: ['']
      },
      create_at: 0,
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link']
      }
    }
  },
  mixins: [modalMixin],
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false,
        articleImagesUrl: this.article.articleImagesUrl || []
      }
      ;[this.create_at] = new Date(this.tempArticle.create_at * 1000).toISOString().split('T')
    },
    'tempArticle.isPublic': {
      handler() {
        if (this.tempArticle.isPublic === 'true') {
          this.tempArticle.isPublic = true
        } else if (this.tempArticle.isPublic === 'false') {
          this.tempArticle.isPublic = false
        }
      },
      deep: true
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  methods: {
    uploadFile(ref, item, index) {
      const uploadedFile = this.$refs[ref].files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.status.fileUploading = true
      const status = '圖片上傳'
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.status.fileUploading = false
          if (res.data.success) {
            if (index || index === 0) {
              this.tempArticle[item][index] = res.data.imageUrl
            } else {
              this.tempArticle[item] = res.data.imageUrl
            }
            this.$refs[ref].value = ''
            this.httpMessageState(res, status)
          } else {
            this.$refs[ref].value = ''
            this.httpMessageState(res, status)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/custom/_modal';

.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
