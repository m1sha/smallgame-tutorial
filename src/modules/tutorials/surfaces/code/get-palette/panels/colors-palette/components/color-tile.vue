<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ color: string, selected: boolean }>()
const emit = defineEmits<{ 
  changeColor: [color: string],
  colorSelect: [color: string]
}>()

const colorPicker = ref<HTMLInputElement>()

const onInput = () => {
  emit('changeColor', colorPicker.value?.value ?? '')
}

const onSelectTile = () => {
  emit('colorSelect', colorPicker.value?.value ?? '')
}

</script>

<template>
<div class="palette-color-tile" :class="{ selected }"  @click.stop="onSelectTile">
  <div class="color" :style="{ backgroundColor: color }">
  <div class="button" @click="colorPicker.click()">
    <input type="color" style="opacity: 0;" :value="color" ref="colorPicker" @input="onInput" />
    <span>✏️</span>
  </div>
  </div>
</div>
</template>

<style lang="css">
.palette-color-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  width: 40px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 4px;

  &.selected {
    border: 1px solid #00c732;
  }

  .color {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 4px;
  }

  .button {
    font-size: 12px;
    border: none;
    background-color: transparent;
    height: fit-content;
    width: 100%;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    span {
      padding: 4px;
    }
    
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