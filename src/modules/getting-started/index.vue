<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { main } from './hello-world';


const root = ref<HTMLDivElement>()

onMounted(()=>{
  main(root.value!)
})

</script>

<template>
  <h1>SmallGame Tutorial</h1>


  <div ref="root">

  </div>
</template>