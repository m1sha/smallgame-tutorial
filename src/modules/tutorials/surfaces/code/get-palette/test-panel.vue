<script setup lang="ts">
defineProps<{message: string}>()
const emit = defineEmits<{ postData: [ action: string ] }>()
</script>

<template>
  <h2>{{  message }}</h2>
  <button @click="emit('postData', 'zip')">Get Zipped Image</button>
  <button @click="emit('postData', 'hide')">Hide Me</button>
</template>