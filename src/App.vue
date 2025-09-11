<script setup lang="ts">
import { useRoute } from 'vue-router'

const isSelect = (value: string) => useRoute().path.indexOf(value) > -1
</script>

<template>
  <div class="layout">
    <menu class="main-menu">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/gl/" :class="{ selected: isSelect('/gl/') }">WebGL</RouterLink>
        <RouterLink to="/gl-raw/">WebGL RAW</RouterLink>
        <RouterLink to="/surfaces/" :class="{ selected: isSelect('/surfaces/') }">Surfaces</RouterLink>
        <RouterLink to="/flappy/">Flappy</RouterLink>
        <RouterLink to="/raster-filers/">Raster Filers</RouterLink>
      </nav>
    </menu>

    <main>
      <RouterView />
    </main>
  </div>
</template>


