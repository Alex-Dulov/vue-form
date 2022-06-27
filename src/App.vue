<template>
  <section class="base">
    <div class="base__buttons">
      <base-button name="Форма подачи заявки в модальном окне" @click="toggleModal"/>
    </div>
    <h1 class="base__title">
      Форма подачи заявки (не в модальном окне)
    </h1>
    <base-form/>
    <base-modal v-if="isShowModal" @close="toggleModal">
      <template v-slot:title>
        <h1>
          Форма подачи заявки
        </h1>
      </template>
      <template v-slot:content>
        <base-form/>
      </template>
    </base-modal>
  </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from './components/base-button/base-button.vue';
import BaseModal from './components/base-modal/base-modal.vue';
import BaseForm from './components/base-form/base-form.vue';


export default defineComponent({
  name: 'App',

  components: {
    BaseButton,
    BaseModal,
    BaseForm
  },

  data: () => ({
    isShowModal: false,
    someString1: "Example",
    someString2: "Words",
  }),

  created() {
    console.log("The application created");
  },

  mounted() {
    console.log("The application mounted");
    console.log("Befor computed: " + this.someComputed);
    this.someComputed = "Some Text";
    console.log("After computed: " + this.someComputed);
  },

  computed: {
    someComputed: {
      get: function () {
        return this.someString1 + ' ' + this.someString2;
      },
      set: function (value: string) {
        let strings = value.split(' ');
        this.someString1 = strings[0];
        this.someString2 = strings[strings.length - 1];
      }
    }
  },
  teleport: {},

  methods: {
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  background-color: #222222;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.base__buttons {
  margin-bottom: 48px;
}

.base__title {
  color: #ffffff;
}
</style>
