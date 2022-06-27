<template>
  <form class="base-form" action="/" @submit.prevent="onSubmit">
    <label class="base-form__label" for="name">
      <input class="base-form__input" id="name" type="text" placeholder="Имя"
             v-model.trim.lazy="v$.name.$model">
      <p class="base-form__label-error" v-if="v$.name.$invalid && v$.name.$dirty">
        Введите Ваше имя
      </p>
    </label>
    <label class="base-form__label" for="mail">
      <input class="base-form__input" id="mail" type="email" placeholder="Почта"
      v-model.trim.lazy="v$.mail.$model">
      <p class="base-form__label-error" v-if="v$.mail.$invalid && v$.mail.$dirty">
        Введите Ваш почтовый адрес
      </p>
      <p class="base-form__label-error" v-if="v$.mail.$invalid && v$.mail.$dirty">
        Неправильный формат почтового адресса
      </p>
    </label>
    <label class="base-form__label" for="phone">
      <input class="base-form__input" id="phone" type="tel" placeholder="Телефон"
      v-model.trim.lazy="v$.phone.$model" v-imask="phoneMask">
      <p class="base-form__label-error" v-if="v$.phone.$invalid && v$.phone.$dirty">
        Введите Ваш телефон
      </p>
    </label>
    <label class="base-form__label" for="comment">
      <textarea class="base-form__textarea" id="comment" placeholder="Комментарий"
      v-model.trim.lazy="v$.comment.$model"></textarea>
      <p class="base-form__label-error" v-if="v$.comment.$invalid && v$.comment.$dirty">
        Введите Ваш комментарий
      </p>
    </label>
    <base-button name="Отправить заявку" type="submit" :class="{'base-button--disable': v$.$invalid && v$.$anyDirty }"/>
  </form>

  <base-modal v-if="isShowModal" @close="toggleModal">
    <template v-slot:title>
      <h4>
        {{ responseTitle }}
      </h4>
    </template>
    <template v-slot:content>
      <p>
        {{ resposeDescription }}
      </p>
      <base-button name="Закрыть" @click="toggleModal"/>
    </template>
  </base-modal>

</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { IMaskDirective } from "vue-imask";
import BaseButton from "@/components/base-button/base-button.vue";
import BaseModal from "@/components/base-modal/base-modal.vue";
import { api } from "../../api/api";

import { server } from "../../api/server";

if (process.env.NODE_ENV === "development") {
  server();
}

export default defineComponent({
  name: 'BaseForm',
  components: {
    BaseButton,
    BaseModal,
  },

  data: () => ({
    name: "",
    phone: "",
    mail: "",
    comment: "",
    phoneMask: {
      mask: "+{7}(000) 000-00-00",
    },
    isShowModal: false,
    responseTitle: "",
    resposeDescription: "",
  }),
  directives: {
    imask: IMaskDirective,
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(3)
      },
      phone: {
        required,
        minLength: minLength(17)
      },
      mail: {
        required,
        email,
        minLength: minLength(6)
      },
      comment: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.v$.$invalid && this.v$.$anyDirty) {
        axios.post(api.postUser)
            .then(response => {
              console.log("succes", response);
              if (response.status === 200) {
                this.modalContent("Ваша заявка успешно отправлена");
                this.isShowModal = true;
              } else {
                this.modalContent("Что-то пошло не так :(");
                this.isShowModal = true;
              }
            })
            .catch(error => {
              if (error.message) {
                this.modalContent(error.message, error.code);
                this.isShowModal = true;
              }
            })
            .finally(() => {
              this.name = "";
              this.phone = "";
              this.mail = "";
              this.comment = "";
              this.v$.$reset();
            });
      }
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    modalContent(title, description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
    "Eaque est itaque optio placeat velit voluptatibus.") {
      this.responseTitle = title;
      this.resposeDescription = description;
    },
  },
})
</script>

<style scoped>
.base-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 24px;
}

.base-form__label {
}

.base-form__label-error {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: #dd33ff;
}

.base-form__input, .base-form__textarea {
  min-width: 320px;
  border: 1px solid #dd33ff;
  border-radius: 32px;
  padding: 12px 16px;
  background-color: #222222;
  outline: none;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
}

.base-form__input {
}

.base-form__textarea {
  height: 96px;
  resize: none;
}

</style>