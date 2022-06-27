<template>
  <div class="base-modal">
    <div class="base-modal__header">
      <button class="base-modal__button" type="button" @click="onClose">
        [x]
      </button>
    </div>
    <div class="base-modal__body">
      <div class="base-modal__title">
        <slot name="title"></slot>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
  <div class="back" @click="onClose"></div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseModal',
  components: {
  },
  data: () => ({
  }),
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
  mounted () {
    document.body.addEventListener('keyup', e => {
      if (e.key === 'Escape') this.$emit('close')
    })
  },
})
</script>

<style scoped>
.back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000;
  opacity: 0.4;
  z-index: 9998;
}

.base-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 240px;
  min-height: 180px;
  padding: 48px 32px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  background-color: #333333;
  border: 1px solid #666666;
  border-radius: 32px;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

.base-modal__header {
  width: 100%;
  margin-top: -24px;
  margin-bottom: 16px;
  text-align: right;
}

.base-modal__title {
  margin: 0 0 32px;
  color: #ffffff;
}

.base-modal__button {
  color: #ffffff;
  margin-right: -16px;
  border: none;
  background-color: transparent;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.base-modal__button:hover {
  color: #dd33ff;
}

</style>