<template>
  <div class="position-relative">
    <div class="toast-container position-absolute pt-4 pe-4 top-0 end-0" style="z-index: 1500">
      <div
        v-for="(msg, key) in messages"
        :key="key"
        :class="`toast${key}`"
        class="toast show"
        role="alert"
      >
        <div class="toast-header">
          <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
          <strong class="me-auto">{{ msg.title }}</strong>
          <button
            class="btn-close"
            type="button"
            aria-label="Close"
            @click="clearToast(key)"
          ></button>
        </div>
        <div v-if="msg.content" class="toast-body">
          {{ msg.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift()
      }, 4500)
    },
    clearToast(index) {
      this.messages.splice(index, 1)
    }
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
