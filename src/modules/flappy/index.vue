<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { main } from './game';


const root = ref<HTMLDivElement>()

onMounted(()=>{
  main(root.value!)
})

</script>

<template>
  <h1>Flappy</h1>


  <div ref="root">

  </div>
</template>