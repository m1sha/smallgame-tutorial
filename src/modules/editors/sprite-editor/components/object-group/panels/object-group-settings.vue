<script setup lang="ts">
import { computed, ref } from 'vue'
import { FormControl, FormControlContent, ItemList, PushButton, TextBox } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../../store'

const store = useSpriteEditorStore()
console.log('aa')
const count = store.state.selectedObjects.length
const a = Math.sqrt(count)
const x = 0 | a
const y = 0 | Math.sqrt(count -  x * x)
const _cols = ref(x + y)
const _rows = ref(x)


const cols = computed({
  get: () => _cols.value,
  set: (value) => _cols.value = value
})
const rows = computed({
  get: () => _rows.value,
  set: (value) => _rows.value = value
})

function onApply () {
  store.alignImages({ rows: +rows.value, cols: +cols.value})
}

function onMerge () {
  store.mergeSelected()
}

</script>

<template>
  <div class="object-group-settings">
    <FormControl caption="Align Settings">
      <FormControlContent>
        <p>Image List ({{ store.state.selectedObjects.length }})</p>
        <div class="list-wrapper">
        <ItemList :items="store.state.selectedObjects" />
        </div>
        <p>Align by Grid</p>
        <TextBox v-model="cols" caption="Columns" />
        <TextBox v-model="rows" caption="Rows" />

        <PushButton @click="onApply">Apply</PushButton>
      </FormControlContent>
      <FormControl caption="Combine Settings">
        <FormControlContent>
          <PushButton @click="onMerge">Merge Images</PushButton>
        </FormControlContent>
      </FormControl>
    </FormControl>
  </div>
</template>

<style lang="sass">
  .object-group-settings
    display: flex
    flex-direction: column
    gap: 16px

    min-width: 10vw

    p
      font-size: 12px
      margin: 0
      color: var(--text-secondary-color)
    .list-wrapper
      max-height: 20vh
      overflow: auto
</style>