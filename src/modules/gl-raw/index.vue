<script setup lang="ts">
import { onMounted, ref } from "vue"
import { App  } from "./code"

const container = ref<HTMLDivElement>()
const app = new App()

onMounted(async () => {
  await app.run(container.value!)
})
</script>

<template>
  <p>GL Raw</p>
  <div class="gl-raw-container" ref="container"></div>
</template>

<style lang="sass" scoped>
.gl-raw-container
  border: 1px solid #484848
</style>