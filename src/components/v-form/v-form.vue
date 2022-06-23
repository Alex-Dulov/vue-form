<template>
  <form class="v-form" action="#" @submit.prevent="onSubmit">
    <label class="v-form__label" for="name">
      <input class="v-form__input" id="name" type="text">
    </label>
    <label class="v-form__label" for="mail">
      <input class="v-form__input" id="mail" type="text">
    </label>
    <label class="v-form__label" for="phone">
      <input class="v-form__input" id="phone" type="text">
    </label>
    <label class="v-form__label" for="comment">
      <textarea class="v-form__textarea" id="comment"></textarea>
    </label>
  </form>
  <VButton name="Submit" @click="onSubmit"/>
</template>

<script>
import { defineComponent } from 'vue';
import VButton from "@/components/v-button/v-button";

export default defineComponent({
  name: 'VForm',
  components: {
    VButton,
  },
  data: () => ({
  }),
  methods: {
    onSubmit() {
      console.log("submit");
    },
  },
})
</script>

<style scoped>
.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 24px;
  width: 100%;
}

.v-form__label {}

.v-form__input, .v-form__textarea {
  width: 100%;
  border: 1px solid #dd33ff;
  border-radius: 32px;
  padding: 12px 16px;
  background-color: #222222;
  outline: none;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
}

.v-form__input {

}

.v-form__textarea {
  height: 96px;
  resize: none;
}

</style>