<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ caption: string }>()
const open = ref(true)
</script>

<template>
<div class="toolbar-dropdown-panel">
  <div class="toolbar-button" role="button" @click="open = !open">
    <div class="caption" >
      <i class="fa" :class="{ 'fa-chevron-down': open, 'fa-chevron-right': !open }"></i>
      <span>{{ caption }}</span>
    </div>
    
  </div>
  <div v-if="open" class="toolbar-dropdown-panel__content">
    <slot name="content"></slot>
  </div>
</div>
</template>

<style lang="sass">
.toolbar-button
  background-color: var(--panel-color)
  border: 1px solid var(--panel-border)
  color: var(--text-secondary-color)
  padding: 4px 8px
  font-size: 0.75em
  display: flex
  gap: 4px
  align-items: center
  cursor: pointer
  user-select: none
  &:hover
    i, span
      color: var(--text-color)

  .caption
    display: flex
    gap: 4px
    align-items: center
    i
      min-width: 12px
    
.toolbar-dropdown-panel__content
  position: relative
</style>