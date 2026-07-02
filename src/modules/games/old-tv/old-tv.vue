<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GameStation2, IGameStationParameters } from './station'
import { GameStation } from './old-tv/game-station.ts'
import { GameStationSettings } from './old-tv/game-station-settings'
import { Size } from 'smallgame'
import Parameters from './station/ui/parameters.vue'


const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const parameters = ref<IGameStationParameters>({ useShaders: true })

onMounted(async () => {
  const width = container.value!.clientWidth ?? 320 
  const height = container.value!.clientHeight  ?? 330

  const settings: GameStationSettings = {
    container: container.value!,
    fps: fps.value!,
    showTV: true,
    useShaders: true,
    containerSize: new Size(width, height)
  }

   await new GameStation(settings).create()
  //const station = new GameStation2(settings, parameters.value as IGameStationParameters)
  //await station.create()
  //await station.changeGame(0)
})
</script>

<template>
  <div class="game-page">
    <div class="game-page-content">
      <div class="container" ref="container"></div>
      <div class="parameters-block">
        <Parameters :parameters />
      </div>
    </div>
    <div class="fps" ref="fps"></div>
  </div>
</template>

<style lang="sass" scoped>
.game-page-content
  display: grid
  grid-template-columns: 1fr 250px
  gap: 4px
.container 
  height: calc(100vh - 49px)
  background-color: #222
.parameters-block
  background-color: #222

</style>

