<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { GameStation } from './old-tv';
import { GameStationSettings } from './old-tv/game-station-settings';

const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()

onMounted(async () => {
  const settings: GameStationSettings = {
    container: container.value!,
    fps: fps.value!,
    showTV: true,
    useShaders: true
  }

  const width = container.value!.clientWidth ?? 320
  const height = (container.value!.clientHeight  ?? 330) -10

  await new GameStation(settings, width, height).create()
})
</script>

<template>
  <div class="game-page">
    <div class="container" ref="container"></div>
    <div class="fps" ref="fps"></div>
  </div>
</template>

<style lang="sass">
.container 
  height: calc(100vh - 48px)

</style>