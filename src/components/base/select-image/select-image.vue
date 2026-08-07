<script setup lang="ts">
import { Surface } from 'smallgame';
import { nextTick, ref, toRaw, watch } from 'vue';

const props = defineProps<{ items: { id: string, name?: string, surface: Surface }[] }>()
const canvasElement = ref<HTMLCanvasElement>()

watch(() => props.items, async () => {
  await nextTick()
  const it = props.items[0]
  if (!it) return
  if (!canvasElement.value) return
  const surface = toRaw(it.surface)
  canvasElement.value.getContext('2d')!.drawImage(surface.origin, 0, 0)
  
}, { immediate: true })

</script>

<template>
  <div>
    <canvas ref="canvasElement" width="180" height="120"></canvas>
  </div>
</template>