<script setup lang="ts">
import { ref, watch } from 'vue';
import { ITelemetry } from '../../code/telemetry'
import TelemetryChart from './telemetry-chart.vue'
const props = defineProps<{telemetry: ITelemetry}>()
const toggle = ref(props.telemetry.openned)
const openChart = ref(props.telemetry.opennedChart)

watch(() => props.telemetry.openned, () => toggle.value = props.telemetry.openned)
watch(() => props.telemetry.opennedChart, () => openChart.value = props.telemetry.opennedChart)

</script>

<template>
  <div class="telemetry-wrapper">
    <div class="telemetry-header">
      <div @click="toggle = !toggle">
        <i class="fa fa-chevron-down"></i>
      </div> 
      <span @click="toggle = !toggle">Telemetry</span>
      <button class="chart-button" :class="{ selected: openChart }" @click="openChart = !openChart"><i class="fa fa-chart-column"></i></button>
    </div>
    <div class="telemetry-list" v-show="toggle">
      <div v-for="parameter in telemetry.parameters" class="telemetry-parameter">
        <span>{{ parameter.name }}</span>
        <span>{{ parameter.value }}</span>
      </div>
    </div>
  </div>

  <TelemetryChart v-if="openChart" :telemetry="telemetry" />
</template>

<style lang="sass">
.telemetry-wrapper
  position: absolute
  left: calc( 12vw + 8px )
  top: 4px
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

      & > span
        font-size: 0.65em

        &:first-child
          color: var(--text-secondary-color)

        &:last-child
          margin-left: auto

      
       
</style>