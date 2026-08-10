<script setup lang="ts" generic="T">
import './style.css'
import { ref } from 'vue'

export interface IHeader<T> {
  key: keyof T,
  name: string
}

defineProps<{
  headers: IHeader<T>[],
  items: T[]
}>()

const emit = defineEmits<{ 
  replace: [newIndex: number, oldIndex: number]
}>()

const canDrag = ref(false)
const draggingIndex = ref(null)
const dropTargetIndex = ref(null)

const onDragStart = (event, index) => {
  console.log((event.target as HTMLElement).className)
  //if (!event.target.closest('.drag-handle')) {
  //  // Если схватились не за ручку — отменяем перетаскивание
  //  event.preventDefault();
  //  return;
  //}
  
  // Устанавливаем эффект перетаскивания
  event.dataTransfer.effectOptions = 'move';
  event.dataTransfer.setData('text/plain', index);
  

  const id = setTimeout(() => {
    draggingIndex.value = index;
    clearTimeout(id)
  }, 0)
};

const onDragOver = (event, index) => {
  dropTargetIndex.value = index
}

const onDragLeave = () => {
  dropTargetIndex.value = null
}

const onDrop = (event, targetIndex) => {
  const sourceIndex = draggingIndex.value;
  if (sourceIndex === null || sourceIndex === targetIndex) return;

  emit('replace', targetIndex, sourceIndex)

  // Переставляем элементы в массиве store.items
  
  
  draggingIndex.value = null;
  dropTargetIndex.value = null
}

</script>
<template>
  <div class="grid-table">
    <div class="headers">
      <div class="header">&nbsp;</div>
      <div class="header" v-for="header in headers">
        {{ header.name }}
      </div>
      <div class="header">&nbsp;</div>
    </div>
    <div 
      v-for="item, index in items"
      class="row" 
      :class="{ 'dragging': draggingIndex === index, 'drop-placeholder': dropTargetIndex === index && draggingIndex !== index  }"
      :draggable="canDrag"
      @dragstart="onDragStart($event, index)"
      @dragover.prevent="onDragOver($event, index)"
      @dragleave="onDragLeave"
      @drop="onDrop($event, index)"
      >
      
      <div class="column drag-handle" @pointerenter="canDrag = true" @pointerleave="canDrag = false" >
        <i class="fa fa-grip-vertical"></i>
      </div>
      <div class="column" v-for="header in headers">
        <slot :name="header.key" :item :index>
          <span v-if="item[header.key]">{{ item[header.key] }}</span>
        </slot>
      </div>
      
      <div class="column button-column">
        <slot name="action-column" :item :index></slot>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.grid-table {

}
</style>