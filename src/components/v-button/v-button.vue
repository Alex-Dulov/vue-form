<template>
  <button class="v-button">
    {{ name }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VButton',
  props: {
    name: String,
  },
});
</script>

<style scoped>
.v-button {
  height: 64px;
  min-width: 200px;
  border: 2px solid transparent;
  border-radius: 32px;
  text-decoration: none;
  transition: background-color .3s ease, border-color .3s ease;
  user-select: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  background-color: #9900dd;
}

.v-button:hover {
  background-color: #aa00ee;
}

.v-button--disable {
  color: #dddddd;
  background-color: #999999;
}

.v-button--disable:hover {
  background-color: #999999;
}

</style>