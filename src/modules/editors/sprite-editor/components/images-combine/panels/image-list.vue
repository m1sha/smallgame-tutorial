<script setup lang="ts">
import { FormControl, ItemList } from 'vue3-universal-components'
import { useImagesCombinerStore} from '../../../store'
import { ref } from 'vue';

const store = useImagesCombinerStore()
const selected = ref<string[]>([])

</script>

<template>
  
<FormControl caption="Image List" class="image-list-panel" v-if="store.currentObject">
  <div class="image-list-wrapper">
    <ItemList v-model="selected" :items="store.currentObject.images" multiselect>
      <template #list-item-title="{ item }">
        <span>{{ item.name }}</span>
        <span>{{ item.size.width }}x{{ item.size.height }}</span>
      </template>
    </ItemList>
  </div>
</FormControl>
  
</template>

<style lang="sass">
.image-list-panel
  .image-list-wrapper
    margin: 4px 8px
    max-height: 20vh
    overflow-y: auto

  // .images-combine-settings
  //   display: flex
  //   flex-direction: column
  //   gap: 16px
</style>