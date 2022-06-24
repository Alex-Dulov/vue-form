<template>
  <VButton name="Click Me!!" @click="isShowModal = true"/>
  <VModal v-if="isShowModal" @close="isShowModal = false">
    <VForm/>
  </VModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from './components/v-button/v-button.vue';
import VModal from './components/v-modal/v-modal.vue';
import VForm from './components/v-form/v-form.vue';

export default defineComponent({
  name: 'App',
  components: {
    VButton,
    VModal,
    VForm
  },
  data: () => ({
    isShowModal: false,
  }),
  methods: {

  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
