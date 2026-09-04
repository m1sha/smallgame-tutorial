<script setup lang="ts">
import { Editor, usePlugins } from '../../components/ide'
const plugins = usePlugins()
</script>

<template>
  <Editor :plugins />
</template>