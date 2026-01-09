<script setup lang="ts">
import { FormControl, ItemList, PushButton, TextBox } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../store'
import { computed, ref } from 'vue'
import { PlaySpriteSheetDialog } from '../play-sprite-sheet'

const showPlaySpriteSheetDialog = ref(false)
const store = useSpriteEditorStore()
const outputObject = ref('')

const canSave = computed(() => {
  const batch = store.state.currentObject.batch
  return Boolean(batch.name) && batch.start > -1
})

const downloadSpriteSheetBatches = () => {
  const batches = store.state.currentObject?.batches
  if (!batches) return
  outputObject.value = ''
  let result = '{\n'
  for (const batch of batches) {
    result += `\t${batch.name}: [${batch.start}, ${batch.count + 1}],\n`
  }
  result = result.substring(0, result.length - 2)
  result += '\n}'
  outputObject.value = result
}

</script>
<template>
  <FormControl caption="Clips" class="batches-form">
    <div class="batches-form-content" style="padding: 4px">
      <div class="current-batch">
        <p>Frame Range </p>
        <div class="batch-range">
          <span>Start</span><span>{{ store.state.currentObject.batch.start }}</span>
          <span>Count</span><span>{{ store.state.currentObject.batch.count + 1 }}</span>
        </div>
      </div>
      <div class="batch-input">
        <TextBox caption="Clip Name" v-model="store.state.currentObject.batch.name" /> 
        <PushButton @click="store.addBatch()" :disabled="!canSave">Add Clip</PushButton>
      </div>

      <div class="batch-list-wrapper">
      <ItemList :items="store.state.currentObject.batches.map(p => ({ id: p.name, ...p}))">
        <template #list-item-title="{item}">
          <div class="batch-row-template">
            <span>{{ item.name }}</span>
            <div class="batch-range">
              <span>Start</span><span>{{ item.start }}</span>
              <span>Count</span><span>{{ item.count + 1 }}</span>
            </div>
              <PushButton @click.stop="showPlaySpriteSheetDialog = true" size="small">Play</PushButton>
          </div>
        </template>
      </ItemList>
      </div>

      <div class="batch-list-output-wrapper">
        <PushButton @click="downloadSpriteSheetBatches">
          Download SpriteSheet Clips
        </PushButton>
        <div>
            <code >
              <pre v-html="outputObject"></pre>
            </code>
         </div>
      </div>
      
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
      display: flex
      gap: 12px
      align-items: center
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
    .batch-list-wrapper
      margin: 12px 0
    .batch-row-template
      display: flex
      gap: 4px
      align-items: center
      width: 100%
      button
        padding: 2px
        //justify-self: flex-end
        margin-left: auto
    .batch-range
      display: flex
      gap: 4px
      align-items: center
      span
        &:nth-child(odd)
          color: var(--text-secondary-color)
          font-size: .6em
          
        
        


</style>