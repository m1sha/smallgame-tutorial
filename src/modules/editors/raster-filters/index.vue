<script setup lang="ts">
import FilterList from './components/filter-list.vue'
import Viewer from './components/viewer.vue'
</script>

<template>
  <div class="raster-filters-page">
    <h2>Raster Filters</h2>

    <div class="app-container">
      <Viewer />
      <FilterList />
    </div>

  </div>
</template>

<style lang="sass" scoped>
h2
  margin: 0
.raster-filters-page
  .app-container
    display: grid
    grid-template-columns: 1fr 350px
    gap: 18px
</style>