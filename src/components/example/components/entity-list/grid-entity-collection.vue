<script setup lang="ts">
import { computed, toRaw } from 'vue'
import { IGridEntityCollection } from '../../code/enity-list/collections'

const props = defineProps<{ collection: IGridEntityCollection}>()

const entities = computed(() => props.collection.objs.map(p => props.collection.map(p)))

const isSelected = (index: number) => {
  return toRaw(props.collection.selected) === toRaw(props.collection.objs[index])
}

const onSelect = (index: number) => {
  const obj = props.collection.objs[index]
  props.collection.selected = obj
  props.collection.onSelect?.(obj)
}

</script>

<template>
  <div  class="entity-grid" :style="`grid-template-columns: repeat(${collection.columnCount}, 1fr)`">
    <div 
      class="entity-grid-cell" 
      :class="{ selected: isSelected(index) }" 
      :title="value.title"
      v-for="value, index in entities" 
      @click="onSelect(index)">
        <div :style="`background-image: url(${value.icon}); width: ${collection.iconSize.width}px; height: ${collection.iconSize.height}px;` "></div>
    </div>
  </div>
</template>

<style lang="css">
.entity-grid {
  display: grid;
  /* gap: 2px; */
  .entity-grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-radius: 4px; */
    /* border: 2px solid #333; */
    padding: 2px;

    &.selected {
      /* border: 2px solid #aaa; */
      background-color: #c0c0c0;
    }
  }
}
</style>