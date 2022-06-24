<template>
  <form class="v-form" action="#" @submit.prevent="onSubmit">
    <h1 class="v-form__title">Lorem ipsum form</h1>
    <label class="v-form__label" for="name">
      <input class="v-form__input" id="name" type="text" placeholder="Name"
             v-model.trim.lazy="v$.name.$model">
      <p class="v-form__label-error" v-if="v$.name.$invalid && v$.name.$dirty">
        Enter your name
      </p>
    </label>
    <label class="v-form__label" for="mail">
      <input class="v-form__input" id="mail" type="email" placeholder="Mail"
      v-model.trim.lazy="v$.mail.$model">
      <p class="v-form__label-error" v-if="v$.mail.$invalid && v$.mail.$dirty">
        Enter your e-mail
      </p>
      <p class="v-form__label-error" v-if="v$.mail.$invalid && v$.mail.$dirty">
        Wrong mail format
      </p>
    </label>
    <label class="v-form__label" for="phone">
      <input class="v-form__input" id="phone" type="tel" placeholder="Phone"
      v-model.trim.lazy="v$.phone.$model" v-imask="phoneMask">
      <p class="v-form__label-error" v-if="v$.phone.$invalid && v$.phone.$dirty">
        Enter your phone number
      </p>
    </label>
    <label class="v-form__label" for="comment">
      <textarea class="v-form__textarea" id="comment" placeholder="Comment"
      v-model.trim.lazy="v$.comment.$model"></textarea>
      <p class="v-form__label-error" v-if="v$.comment.$invalid && v$.comment.$dirty">
        Enter your comment
      </p>
    </label>
    <VButton name="Submit" @click="onSubmit" :class="{'v-button--disable': v$.$invalid && v$.$anyDirty }"/>
  </form>
</template>

<script>
import { defineComponent } from 'vue';
import VButton from "@/components/v-button/v-button";
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { IMaskDirective } from "vue-imask";
import axios from "axios";
import {makeServer} from "../../api/mirage";
import {api} from "../../api/api";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

export default defineComponent({
  name: 'VForm',
  components: {
    VButton,
  },
  data: () => ({
    name: "",
    phone: "",
    mail: "",
    comment: "",
    phoneMask: {
      mask: "+{7}(000) 000-00-00",
    },
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
              // console.log(response);
            })
            .catch(error => {
              // console.log(error);
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
  },
})
</script>

<style scoped>
.v-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 24px;
}

.v-form__title {
  margin: 0;
  color: #ffffff;
}

.v-form__label {}

.v-form__label-error {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: #dd33ff;
}

.v-form__input, .v-form__textarea {
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