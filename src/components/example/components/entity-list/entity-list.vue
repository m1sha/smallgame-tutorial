<script setup lang="ts">
import { IEnityList } from '../../code'
import GridEntityCollection from './grid-entity-collection.vue';
import ListEntityCollection from './list-entity-collection.vue';

const { entities } = defineProps<{ entities: IEnityList }>()

</script>
<template>
  <div class="entity-list-wrapper">
    <div class="entity-list">
      <div v-for="item in entities.items" class="entity-panel">
      
        <!--@vue-ignore-->
        <ListEntityCollection v-if="item.type === 'list'" :collection="item" />
      
        <!--@vue-ignore-->
        <GridEntityCollection v-if="item.type === 'grid'" :collection="item" />
      
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.entity-list-wrapper
  position: absolute
  z-index: 1
  top: 0
  padding: 8px 8px 
  background-color: rgba(55, 55, 55, 0.4941176471)
  backdrop-filter: blur(2px)
  border: 1px solid var(--panel-border)
  width: 17vw

  .entity-list
    display: flex
    flex-direction: column
    gap: 8px

</style>