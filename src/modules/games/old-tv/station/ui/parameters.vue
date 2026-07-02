<script setup lang="ts">
import { Switch } from 'vue3-universal-components';
import GameDebugConsole from './game-debug-console.vue'
import { IGameStationParameters } from '../parameters';

defineProps<{ parameters: IGameStationParameters }>()

</script>

<template>
  <div style="padding: 8px;">
    <Switch caption="Use Shaders" v-model="parameters.useShaders" />
    <GameDebugConsole />
  </div>
</template>