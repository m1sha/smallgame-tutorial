<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <menu class="main-menu">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/gl/">WebGL</RouterLink>
        <RouterLink to="/flappy/">Flappy</RouterLink>
        <RouterLink to="/raster-filers/">Raster Filers</RouterLink>
      </nav>
    </menu>

    <main>
      <RouterView />
    </main>
  </div>
</template>


