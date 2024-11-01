<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <menu class="main-menu">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/gl/">WebGL</RouterLink>
      </nav>
    </menu>

    <main>
      <RouterView />
    </main>
  </div>
</template>


