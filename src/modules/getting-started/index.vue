<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { main } from './hello-world'

const root = ref<HTMLDivElement>()

onMounted(()=>{
  main(root.value!)
})

</script>

<template>
  <div ref="root" class="home-page">

  </div>
</template>

<style lang="sass">
.home-page
  display: flex
  height: calc( 100vh -  44px)
  width: 100%
  justify-content: center
  align-items: center
</style>