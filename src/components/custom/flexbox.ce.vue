<script setup lang="ts">
withDefaults(
  defineProps<{
    vert: boolean
    noGap: boolean
  }>(),
  { 
    vert: false,
    noGap: false
  }
)
</script>
<template>
  <div style="display: flex; gap: 8px;" :style="{ 
    flexDirection: vert ? 'column' : 'row',
    gap: noGap ? undefined : '8px'
    }">
  <slot></slot>
  </div>
</template>