<script setup lang="ts">
const emit = defineEmits<{postData: [ actionName: string ] }>()
</script>

<template>
  <div class="ga-actions-panel">
    <div>
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
  
}
</style>