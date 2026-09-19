<script setup lang="ts">
import { DropDownList } from 'vue3-universal-components';
import { ActionsData } from '../actions-data';
defineProps<ActionsData>()
const emit = defineEmits<{postData: [ actionName: string ] }>()
</script>

<template>
  <div class="ga-actions-panel">
    <div>
      <DropDownList :items="[
        { id: 'interactive', name: 'Interactive' },
        { id: 'step', name: 'Step By Step' },
        { id: 'agent', name: 'Agent Play' }
      ]" caption="Mode" v-model="parameters.mode" class="ga-dropdown" />
    </div>
    <div>
      <button @click="emit('postData', 'left')">Left</button>
      <button @click="emit('postData', 'stay')">Stay</button>
      <button @click="emit('postData', 'right')">Right</button>
    </div>
  </div>
</template>

<style lang="css">
.ga-actions-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  .ga-dropdown {
    .dropdown-caption {
      border-color: #333 !important;
      border-radius: 4px !important;
    }
  }
  
}
</style>