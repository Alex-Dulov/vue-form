<template>
  <div class="v-modal">
    <div class="v-modal__header">
      <button class="v-modal__button" type="button" @click="$emit('close')">
        [x]
      </button>
    </div>
    <div class="v-modal__body">
      <VForm/>
    </div>
  </div>
  <div class="back" @click="$emit('close')"></div>
</template>

<script>
import { defineComponent } from 'vue';
import VForm from "@/components/v-form/v-form";

export default defineComponent({
  name: 'VModal',
  components: {
    VForm,
  },
  data: () => ({
  }),
  methods: {
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
  opacity: 0.2;
  z-index: 9998;
}

.v-modal {
  position: fixed;
  min-width: 320px;
  min-height: 480px;
  padding: 32px;
  background-color: #333333;
  border-radius: 32px;
  z-index: 9999;
}

.v-modal__header {
  width: 100%;
  margin-top: -16px;
  text-align: right;
}

.v-modal__button {
  color: #ffffff;
  margin-right: -16px;
  border: none;
  background-color: transparent;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.v-modal__button:hover {
  color: #dd33ff;
}

</style>