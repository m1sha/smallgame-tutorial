<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ color: string }>()
const emit = defineEmits<{ changeColor: [color: string], deleteColor: [] }>()

const colorPicker = ref<HTMLInputElement>()

const onInput = () => {
  emit('changeColor', colorPicker.value?.value ?? '')
}

</script>

<template>
<div class="menu" :style="{ backgroundColor: color }">
  <div class="button" :style="{ backgroundColor: color }" @click="emit('deleteColor')">
   🗑️
  </div>
  <div class="button" :style="{ backgroundColor: color }" @click="colorPicker.click()">
    ✏️
    <input type="color" style="opacity: 0;" :value="color" ref="colorPicker" @input="onInput" />
  </div>
  
</div>
</template>

<style lang="css">
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  .button {
    font-size: 12px;
    border: none;
    background-color: transparent;
    height: 100%;
    width: 100%;
    opacity: 0;
    text-align: center;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }

    input[type="color"] {
      width: 0;
      height: 0;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
    }
  }


}


</style>