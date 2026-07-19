<script setup lang="ts">
defineProps<{ color: string }>()
</script>
<template>
  <div class="bx16" :style="{ backgroundColor: color }"></div>
</template>

<style lang="css" scoped>
.bx16 {
  width: 16px;
  height: 16px;
}
</style>