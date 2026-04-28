<script setup lang="ts">
import { computed } from 'vue';
import { IListEntityCollection } from '../../code/enity-list/collections';

const props = defineProps<{ collection: IListEntityCollection}>()

const entities = computed(() => props.collection.objs.map(p => props.collection.map(p)))

</script>

<template>
  <p class="collection-caption" v-if="collection.options.caption">{{ collection.options.caption }}</p>

  <div class="collection-list">
    <div class="collection-list-item" v-for="value in entities">
      <div>
        {{  value.caption }}
      </div>
      <div class="list-item-buttons">
        <button class="list-item-button"><i class="fa fa-trash"></i></button>
      </div>
    </div>
  </div>
</template>

<style lang="css">
@import url('styles.css');

.collection-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 4px;

  .collection-list-item {
    color: #bbb;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 2px;
    border-bottom: 1px solid #444;

    &:hover {
      background-color: #555;
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