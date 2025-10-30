<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <menu class="main-menu">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <div class="sep"></div>
        <RouterLink to="/tutorials">Tutorials</RouterLink>
        <div class="sep"></div>
        <RouterLink to="/raster-filers/">Raster Filers</RouterLink>
        <div class="sep"></div>
        <RouterLink to="/editors/polygon-editor">Polygon Editor</RouterLink>
      </nav>
    </menu>

    <main>
      <RouterView />
    </main>
  </div>
</template>


