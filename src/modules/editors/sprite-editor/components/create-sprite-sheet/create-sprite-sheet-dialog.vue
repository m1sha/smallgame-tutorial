<script setup lang="ts">
import { ModalDialog } from 'vue3-universal-components';
defineProps<{ show: boolean }>()
</script>
<template>
  <ModalDialog :show ="show" >

  </ModalDialog>
</template>