<script setup lang="ts">
import { IUI } from '../../code/ui';
import UI from './ui/ui.vue';

const props = defineProps<{ ui: IUI }>()

</script>

<template>
  <div class="parameter-list-wrapper" v-if="ui.controls.length > 0">
    <UI :ui="ui"  />
  </div>
</template>

<style lang="sass">
.parameter-list-wrapper
  position: absolute
  z-index: 1
  right: 0
  padding: 8px 16px 
  background-color: rgba(55, 55, 55, 0.4941176471)
  backdrop-filter: blur(2px)
  border: 1px solid var(--panel-border)
  height: calc( 100vh -  116px)
  width: 10vw

  box-shadow: inset 16px 0px 60px #4444444e, -16px 0px 20px #3636364e
  
  
</style>