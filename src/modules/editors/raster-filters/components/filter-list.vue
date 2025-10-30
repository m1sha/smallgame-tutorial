<script setup lang="ts">
import './filters/filter.sass'
import EraseColorFilter from './filters/erase-color-filter.vue'
import DepletePaletteFilter from './filters/deplete-palette-filter.vue'
</script>

<template>
  <div class="filter-list">
    <EraseColorFilter />
    <DepletePaletteFilter />
  </div>
</template>