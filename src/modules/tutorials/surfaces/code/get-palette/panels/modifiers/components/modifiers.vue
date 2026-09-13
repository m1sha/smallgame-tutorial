<script setup lang="ts">
import { ref } from 'vue';
import { Tracker } from 'vue3-universal-components';
import { ModifiersData } from '../modifiers-data';

defineProps<ModifiersData>()
const emit = defineEmits<{ postData: [actionName: string, args?: any ] }>()
const colorCount = ref(0)
const modifierIndex = ref(0)
const phase = ref(0)

const onTabChanged = (index: number) => {
  modifierIndex.value = index
  const modifiers = ['indexinf-color', 'replace-colors', 'erase-colors']

  emit('postData', 'modifier-changed', modifiers[index])
}

const onGetBackClick = () => {
  phase.value = 0
  emit('postData', 'getback')
}
const onSaveClick = () => { 
  phase.value = 0
  emit('postData', 'save')
}
const onApplyClick = () => { 
  const index = modifierIndex.value
  phase.value = 1
  if (index === 0) emit('postData', 'indexing-colors')
  if (index === 1) emit('postData', 'replace-colors')
  if (index === 2) emit('postData', 'erase-colors')
}

</script>

<template>
  <div class="modifiers">
    <div class="modifiers-tabs">
      <div class="modifier-tab" :class="{ selected: modifierIndex === 0 }" @click="onTabChanged(0)">
        <i class="fa-solid fa-table-cells"></i>
      </div>
      <div class="modifier-tab" :class="{ selected: modifierIndex === 1 }" @click="onTabChanged(1)">
        <i class="fa-solid fa-repeat"></i>
      </div>
      <div class="modifier-tab" :class="{ selected: modifierIndex === 2 }" @click="onTabChanged(2)">
        <i class="fa-solid fa-eraser"></i>
      </div>
    </div>
    <div class="modifier-content">

      <div class="modifier-parameters" v-if="modifierIndex === 0" title="Indexing Colors" role="button">
        <p>Indexing Colors</p>
        <div class="checkbox">
          <input type="checkbox" v-model="indexing.usePaletteColors" /> <span>Use Palette Colors</span>
        </div>
        <Tracker caption="Colors" v-model="indexing.count" :min="2" :max="512" :step="1" />
        <Tracker caption="Thrashold" v-model="indexing.thrashold" :min="0.000001" :max="8" :step="0.0001" />
      </div>

      <div class="modifier-parameters" v-if="modifierIndex === 1" title="Replace Colors" role="button">
        <p>Replace Colors</p>
        <Tracker caption="Max Distance" v-model="colorCount" :min="0.000001" :max="1" :step="0.0001" />
      </div>

      <div class="modifier-parameters" v-if="modifierIndex === 2" title="Erase Colors" role="button">
        <p>Erase Colors</p>
        <Tracker caption="Thrashold" v-model="erase.thrashold" :min="0.000001" :max="8" :step="0.0001" />
      </div>

      <div class="modifier-usage">
        <button v-if="phase === 1" @click="onGetBackClick">Get Back</button>
        <button v-if="phase === 1" @click="onSaveClick">Save</button>
        <button v-if="phase === 0" @click="onApplyClick">Apply</button>
      </div>
      
    </div>
  </div>
</template>

<style lang="css">
.modifiers {
  display: flex;
  .modifiers-tabs {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .modifier-tab {
      min-width: 30px;
      padding: 12px;
      color: #bbb;
      &.selected {
        background-color: #393939;
        pointer-events: none;
      }
      &:hover {
        cursor: pointer;
        user-select: none;
        color: #eee;
      }
    }
  }

  .modifier-content {
    background-color: #393939;
    min-width: 200px;
    padding: 4px 8px;

    display: flex;
    flex-direction: column;
    gap: 24px;
    .modifier-parameters {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .checkbox {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        color: #ddd;
      }
    }

    .modifier-usage {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
      button {
        min-width: 80px;
      }
    }
  }
}
</style>