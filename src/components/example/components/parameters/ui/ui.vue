<script setup lang="ts">
import { IUI } from '../../../code/ui'
import ControlList from './control-list.vue'

defineProps<{ ui: IUI }>()
</script>

<template>
  <div class="ui">
    <ControlList :controls="ui.controls" :is-toolbar="false" />
  </div>
  
</template>

<style lang="sass">
.ui
  overflow-y: auto
  height: 100%
  padding-right: 4px
</style>