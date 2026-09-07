<script setup lang="ts">
import { Editor, usePlugins } from '../../modules/ide'
const plugins = usePlugins()
</script>

<template>
  <Editor :plugins />
</template>