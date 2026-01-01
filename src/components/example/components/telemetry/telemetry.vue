<script setup lang="ts">
import { ref, watch } from 'vue';
import { ITelemetry } from '../../code/telemetry'
import TelemetryChart from './telemetry-chart.vue'
import { ParameterColors } from './param-colors';
const props = defineProps<{telemetry: ITelemetry}>()
const toggle = ref(props.telemetry.openned)
const openChart = ref(props.telemetry.opennedChart)

watch(() => props.telemetry.openned, () => toggle.value = props.telemetry.openned)
watch(() => props.telemetry.opennedChart, () => openChart.value = props.telemetry.opennedChart)

</script>

<template>
  <div class="telemetry-wrapper">
    <!-- <div class="telemetry-header">
      
      <button class="chart-button" :class="{ selected: openChart }" @click="openChart = !openChart"><i class="fa fa-chart-column"></i></button>
    </div> -->
    <div class="telemetry-list" :style="{ minWidth: telemetry.wide ? '18vw': '8vw' }">
      <div v-for="parameter, i in telemetry.parameters" class="telemetry-parameter">
        
        <span class="telemetry-parameter-key">
          <i :style="{ backgroundColor: ParameterColors[i]}"></i>
          <span>{{ parameter.name }}</span>  
        </span>
        <span class="telemetry-parameter-value" v-html="parameter.value"></span>
      </div>
    </div>
  </div>

  <TelemetryChart v-if="openChart" :telemetry="telemetry" />
</template>

<style lang="sass">
.telemetry-wrapper
  position: absolute
  z-index: 1
  left: 0
  //top: -24px
  anchor-name: --telemetry-wrapper

  .telemetry-header
    background-color: var(--panel-color)
    border: 1px solid var(--panel-border)
    color: var(--text-secondary-color)
    padding: 4px 8px
    font-size: 0.75em
    display: flex
    gap: 4px
    min-width: 8vw
    cursor: pointer
    button.chart-button
      background-color: transparent
      color: var(--text-secondary-color)
      border: 0
      padding: 0 
      margin-left: auto
      &.selected
        color: color-mix(in lch increasing hue, var(--data-accident-color), white 80%) 
      &:hover
        color: var(--text-color)

  .telemetry-list
    display: flex
    flex-direction: column
    gap: 8px
    min-width: 8vw

    padding: 8px
    border: 1px solid var(--panel-border)
    border-top: 0
    background-color: #3737377e

    

    .telemetry-parameter
      display: flex
      gap: 18px
      padding-bottom: 4px
      border-bottom: 1px solid var(--panel-border)
      &:last-child
        border: 0

     

      .telemetry-parameter-key, .telemetry-parameter-value
        font-size: 0.65em
      .telemetry-parameter-key
        color: var(--text-secondary-color)
        display: flex
        align-items: center
        gap: 4px
        i
          width: 8px
          height: 8px 
          border-radius: 50%
          display: block
          opacity: 0.6
      .telemetry-parameter-value
        font-family: "MesloLGSDZ Nerd Font"
        margin-left: auto
      
       
</style>