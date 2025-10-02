<script setup lang="ts">
import { useRoute } from 'vue-router'

const isSelect = (value: string) => useRoute().path.indexOf(value) > -1
</script>

<template>
  <div class="layout">
    <menu class="main-menu">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/gl/" :class="{ selected: isSelect('/gl/') }">GL</RouterLink>
        <RouterLink to="/gl-effects/" :class="{ selected: isSelect('/gl-effects/') }">GL Effects</RouterLink>
        <RouterLink to="/surfaces/" :class="{ selected: isSelect('/surfaces/') }">Surfaces</RouterLink>
        <RouterLink to="/examples/" :class="{ selected: isSelect('/examples/') }">Examples</RouterLink>
        <RouterLink to="/raster-filers/">Raster Filers</RouterLink>
        <RouterLink to="/editors/polygon-editor">Polygon Editor</RouterLink>
      </nav>
    </menu>

    <main>
      <RouterView />
    </main>
  </div>
</template>


