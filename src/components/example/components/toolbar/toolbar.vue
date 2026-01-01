<script setup lang="ts">
</script>

<template>
  <div class="example-page-toolbar">
    <div class="project">
      
      <slot name="project"></slot>
    </div>
    <div class="common-space">
      <slot name="common-space"></slot>
    </div>
    <div class="command-panel">
      <slot name="command-panel"></slot>
    </div>
  </div>
</template>

<style lang="sass">
.example-page-toolbar 
  background-color: #333
  height: 24px
  width: 100%

  display: grid
  grid-template-columns: 12vw 1fr 12vw

  
</style>