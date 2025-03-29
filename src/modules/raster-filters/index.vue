<script setup lang="ts">
import FilterList from './components/filter-list.vue'
import { onMounted, ref } from "vue"
import app from "./code"


const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()




onMounted(() => {
  app.init(container.value!, fps.value!)
})

//function onInput(e: Event) {
//  const value = parseInt((e.target as HTMLInputElement).value)
//  if (api.changeFilterValue) api.changeFilterValue(value)
//}

document.addEventListener('paste', ev => {
  const items = ev.clipboardData?.items ?? []
  const item = items[0]
  if (!item) return
  if (item.kind !== 'file') return
  const file = item.getAsFile()
  if (!file) return
  app.uploadFile?.(file)
})
</script>

<template>
  <div class="raster-filters-page">
    <h1>Raster Filters</h1>

    <div class="app-container">

      <div class="content-viewer">
        <div class="fps" ref="fps"></div>
        <div ref="container"></div>
      </div>

      <FilterList />

    </div>
    
   
  </div>
</template>


<style lang="sass" scoped>
.raster-filters-page
  .app-container
    display: grid
    grid-template-columns: 1fr 350px
    gap: 18px

    .content-viewer
      border: 1px solid #a3a3a3
      


</style>