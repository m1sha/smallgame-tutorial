<script setup lang="ts">
import { MainMenu } from './components/main-menu'

</script>

<template>
  <div class="layout">
    <MainMenu />
    <main>
      <RouterView />
    </main>
  </div>
</template>


