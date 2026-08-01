<script setup lang="ts">
import { SandBox } from '../../components/example'
import items from '../../modules/tutorials/script-list.json'
import categories from '../../modules/tutorials/script-categories.json'
</script>
<template>
  <SandBox :items="items" :categories="categories" />
</template>