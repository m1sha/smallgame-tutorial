<script setup lang="ts">
import { computed, toRaw } from 'vue';
import { IListEntityCollection } from '../../code/enity-list/collections';

const props = defineProps<{ collection: IListEntityCollection}>()

const entities = computed(() => props.collection.objs.map(p => ({ ...props.collection.map(p), obj: p })))

const isSelected = (value: any) => {
  return props.collection.selectedObjs.some(p => toRaw(p) === toRaw(value.obj))
}

const onSelect = (value: any) => {
  props.collection.onSelect?.(toRaw(value.obj))
}

const onDelete = (value: any) => {
  props.collection.onDelete?.(toRaw(value.obj))
}

</script>

<template>
  <p class="collection-caption" v-if="collection.options.caption">{{ collection.options.caption }}</p>

  <div class="collection-list">
    <div class="collection-list-item" :class="{ selected: isSelected(value)  }" v-for="value in entities">
      <div class="caption" @click="onSelect(value)">
        {{  value.caption }}
      </div>
      <div class="list-item-buttons">
        <button class="list-item-button" @click="onDelete(value)"><i class="fa fa-trash"></i></button>
      </div>
    </div>
  </div>
</template>

<style lang="css">
@import url('styles.css');

.collection-list {
  display: flex;
  flex-direction: column;
  
  padding: 0 4px;

  .collection-list-item {
    color: #bbb;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    padding-bottom: 2px;
    border-bottom: 1px solid #444;

    &:hover {
      & > .caption {
        background-color: #555;
      }
    }

    .caption {
      flex: 1;
      padding: 2px;
      border: 1px dashed transparent;
    }

    &.selected {
      & > .caption {
        color: #e5e5e5;
        border: 1px dashed #505050;
        background-color: #4747477e;
        border-radius: 2px;
      }
    }

    .list-item-buttons {
      & > button.list-item-button {
        min-width: 0px;
        border: 0;
        padding: 2px;
        color: #999;

        &:hover {
          color: #aaa;
        }
      }
    }
  }

}
</style>