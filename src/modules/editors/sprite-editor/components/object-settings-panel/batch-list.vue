<script setup lang="ts">
import { FormControl, ItemList, PushButton, TextBox } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../store'
import { computed, ref } from 'vue'
import { PlaySpriteSheetDialog } from '../play-sprite-sheet'

const showPlaySpriteSheetDialog = ref(false)

const store = useSpriteEditorStore()

const canSave = computed(() => {
  const batch = store.state.currentObject.batch
  return Boolean(batch.name) && batch.start > -1 && batch.count > 0
})

</script>
<template>
  <FormControl caption="Batches" class="batches-form">
    <div class="batches-form-content" style="padding: 4px">
      <div class="current-batch">
        <p>Current Batch {{ store.state.currentObject.batch.start }}: {{ store.state.currentObject.batch.count }}</p>
      </div>
      <div class="batch-input">
        <TextBox caption="Batch Name" v-model="store.state.currentObject.batch.name" /> 
        <PushButton @click="store.addBatch()" :disabled="!canSave">Add Batch</PushButton>
      </div>

      <ItemList :items="store.state.currentObject.batches.map(p => ({ id: p.name, ...p}))">
        <template #list-item-title="{item}">
          <div class="batch-row-template">
            <span>{{ item.name }}</span>
            <span>{{ item.start }}</span>
            <span>{{ item.count}}</span>
            <PushButton @click.stop="showPlaySpriteSheetDialog = true" size="small">Play</PushButton>
          </div>
        </template>
      </ItemList>
      
    </div>
  </FormControl>

  <PlaySpriteSheetDialog :show="showPlaySpriteSheetDialog" @closed="showPlaySpriteSheetDialog = false" />
</template>

<style lang="sass">
  .batches-form
    .batches-form-content
      display: flex
      flex-direction: column
      gap: 12px
    .current-batch
      p
        font-size: .75em
        margin: 8px 0
    .batch-input
      display: flex
      align-items: flex-end
      gap: 8px
      input[type="text"]
        width: 100px
      button
        width: 100%
    .batch-row-template
      display: flex
      gap: 4px
      align-items: center
      width: 100%
      button
        padding: 2px
        //justify-self: flex-end
        margin-left: auto
        


</style>