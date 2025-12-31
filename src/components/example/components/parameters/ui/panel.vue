<script setup lang="ts">
import { Panel } from '../../../code/ui/controls'
import ControlList from './control-list.vue'

defineProps<{panel: Panel }> ()
</script>
<template>
  <div class="control-panel" v-show="!panel.hidden">
    
    <ControlList :controls="panel.controls ?? []" :is-toolbar="false" />
  </div>
</template>

<style lang="sass">
.control-panel
  border: 1px solid var(--panel-border)
  display: flex
  flex-direction: column
  color: var(--text-color)
  padding: 0.5em 0.5em 0
  border-radius: 4px
    
 

details.control-group[open] 
  padding: 0.5em



</style>