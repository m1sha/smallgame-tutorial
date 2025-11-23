<script setup lang="ts">
import { ColorPicker } from 'vue3-universal-components'
import { ITelemetry } from '../../code/telemetry'
import Chart from './chart.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const props = defineProps<{ telemetry: ITelemetry }>()
const chart = ref<{ drawGraph: (normalize: boolean) => void }>()
const colors: string[] = ['#11cc12', '#1123ee', '#bb1123', '#cfe221', '#aa00a2ff', '#1ed1c2ff', '#cececeff', '#ca862eff', '#e728c7ff', '#72eeb4ff']
const getLegend = () => props.telemetry.parameters.map((parameter, index) => ({ name: parameter.name, color: colors[index ]}))
const legend = computed(() => getLegend())
const checked = reactive<Set<string>>(new Set())
const getColor = (name: string) => getLegend().find(p=>p.name === name)?.color ?? '#222'
const normalize = ref(false)

const drawChart = () => {
  chart.value?.drawGraph(normalize.value)
}

const selectParameter = (name: string) => {
  checked.has(name) ? checked.delete(name) : checked.add(name)
  drawChart()
}

onMounted(() => {
  checked.clear()
  props.telemetry.parameters.forEach(p => checked.add(p.name))
})

watch(() => props.telemetry.parameters, () => {
  checked.clear()
  props.telemetry.parameters.forEach(p => checked.add(p.name))
})

watch(() => props.telemetry.startRecord, () => {
  if (!props.telemetry.startRecord) drawChart()
})

watch(() => normalize.value, () => drawChart())

</script>

<template>
<div class="telemetry-chart-wrapper">
  <div class="telemetry-char-block">
    <div class="header">
      <button :disabled="telemetry.startRecord" @click="telemetry.claerData(); telemetry.startRecord = true"><i class="fa fa-circle"></i></button>
      <button :disabled="!telemetry.startRecord" @click="telemetry.startRecord = false; drawChart();"><i class="fa fa-stop"></i></button>
      <div></div>
      <div>
        <input type="checkbox" v-model="normalize"></input>
        <label for="">Normalize values</label>
      </div>
    </div>
    <div class="telemetry-char-content" :class="{ record: telemetry.startRecord }">
      <div class="telemetry-params">
        <div class="parameter-list">
          <div class="parameter" v-for="parameter in telemetry.parameters">
            <input type="checkbox" :checked="checked.has(parameter.name)" @click="selectParameter(parameter.name)" />
            <ColorPicker :model-value="getColor(parameter.name)" />
            
            <span>{{ parameter.name }}</span>
          </div>

        
        </div>
      </div>
      <div class="telemetry-chart">
        <Chart :data="telemetry.data" :legend="legend" :checked="checked" ref="chart"  />
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass">
.telemetry-chart-wrapper
  position: absolute
  position-anchor: --telemetry-wrapper
  left: anchor(right)
  top: anchor(top)
  margin-left: 2px
  margin-top: 0px
  
  min-width: 65vw
  height: 60vh

  .telemetry-char-block
    background-color: #3737377e
    width: 100%
    height: 100%
    display: grid
    grid-template-rows: 32px 1fr
    

    .header
      background-color: var(--panel-color)
      display: flex
      gap: 4px
      padding: 4px 8px
      button
        height: 23px
        width: 24px
        padding: 2px
        background-color: transparent
        

        &:first-child
          font-size: 0.5em
          color: #a91109
    .telemetry-char-content
      display: grid
      grid-template-columns: 10vw 1fr

      border: 3px solid #333

      &.record
        border: 3px solid #801111

      .telemetry-params
        background-color: #3737377e

        .parameter-list
          display: flex
          flex-direction: column
          gap: 4px
          padding: 8px
          overflow-y: auto
          height: calc( 40vh - 64px ) 
          .parameter
            display: flex
            gap: 4px
            align-items: center
            span
              font-size: 0.7em
              color: var(--text-secondary-color)
      .telemetry-chart
        background-color: #3737374e       
        display: flex
        justify-content: center
        align-items: center
        padding: 8px

</style>