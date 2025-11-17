<script setup lang="ts">
import { Group } from '../../../code/ui/controls'
import ControlList from './control-list.vue'

defineProps<{group: Group}> ()
</script>
<template>
  <details class="control-group" :open="group.openned">
    <summary>{{ group.name }}</summary>
    <ControlList :controls="group.controls ?? []" :is-toolbar="false" />
  </details>
</template>

<style lang="sass">
details.control-group
  border: 1px solid var(--panel-border)
  display: flex
  flex-direction: column
  color: var(--text-color)
  padding: 0.5em 0.5em 0
  border-radius: 4px
    
  summary 
    font-weight: bold
    margin: -0.5em -0.5em 0
    padding: 0.5em
    font-size: 0.8em
    cursor: pointer

    &:hover
      background-color: var(--panel-color)

details.control-group[open] 
  padding: 0.5em


details.control-group[open] summary 
  border-bottom: 1px solid var(--panel-border)
  margin-bottom: 0.5em

</style>