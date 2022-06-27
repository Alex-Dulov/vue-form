<template>
  <button class="base-button">
    {{ name }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    name: String,
  },
});
</script>

<style lang="scss" scoped>
.base-button {
  height: 64px;
  min-width: 200px;
  padding: 0 32px;
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

  &:hover {
    background-color: #aa00ee;
  }
}

.base-button--disable {
  color: #dddddd;
  background-color: #999999;

  &:hover {
    background-color: #999999;
  }
}

</style>