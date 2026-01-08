<script setup lang="ts">
import { ModalDialog } from 'vue3-universal-components';

defineProps<{ show: boolean }>()
const emit = defineEmits(['closed'])
</script>

<template>
  <ModalDialog title="Play Sprite Animation" :show @closed="emit('closed')">
    <template #body>

    </template>
  </ModalDialog>
</template>