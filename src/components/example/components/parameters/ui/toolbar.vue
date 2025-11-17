<script setup lang="ts">
import { Toolbar as ToolbarComponent } from 'vue3-universal-components'
import { Toolbar } from '../../../code/ui/controls'
import ControlList from './control-list.vue'

defineProps<{ toolbar: Toolbar }> ()
</script>
<template>
  <ToolbarComponent>
    <ControlList :controls="toolbar.controls ?? []" :is-toolbar="true" />
  </ToolbarComponent>
</template>