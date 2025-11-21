<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
</script>
<template>
  <menu class="main-menu">
    <nav>
      <a href="#/" :class="{ 'router-link-active': route.name === 'Home' }">Home</a>
      <div class="sep"></div>
      <a href="#/tutorials" :class="{ 'router-link-active': route.path.startsWith('/tutorials')  }">Tutorials</a>
      <div class="sep"></div>
      <a href="#/raster-filers" :class="{ 'router-link-active': route.name === 'RasterFilers' }">Raster Filers</a>
      <div class="sep"></div>
      <a href="#/editors/polygon-editor" :class="{ 'router-link-active': route.name === 'PolygonEditor' }">Polygon Editor</a>
    </nav>
  </menu>
</template>