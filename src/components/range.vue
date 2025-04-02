<script setup lang="ts">

defineProps<{
  min: number,
  max: number,
  step: number,
  value: number
}>()

const emit = defineEmits<{
  (e: 'input', value: number): void
}>()

const onInput = (ev: Event) => { 
  const value = parseInt((ev.target as HTMLInputElement).value)
  emit('input', value)
}

</script>

<template>
  <div class="range-control">
    <input type="range" :min="min" :max="max" :step="step"  :value="value"  @input="onInput" />
    <div class="range-view">
      <div class="range-track" :style="{width: (value * ( 100 /  (max - min) ) ) + '%'}"></div>
      <div class="range-tracker"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

$range-color: #2d2d2d
$range-border-color: #252525
$range-track-color: #5f5f5f
$range-tracker-color: #5d5d5d
$range-tracker-border-color: #4f4f4f
$range-tracker-hover-color: #838383
$range-focus-border-color: #191919

$range-height: 10px
$range-border-radius: 6px
$range-tracker-size: 16px

.range-control
  position: relative
  height: $range-height
  .range-view
    overflow: visible
    display: flex
    align-items: center
    background-color: $range-color
    border: 1px solid $range-border-color
    border-radius: $range-border-radius
    height: $range-height
    width: 100%
   
    .range-track
      background-color: $range-track-color
      border-top-left-radius: $range-border-radius
      border-bottom-left-radius: $range-border-radius
      height: $range-height
    .range-tracker
      background-color: $range-tracker-color
      border: 1px solid $range-tracker-border-color
      border-radius: 50%
      margin-left: -3px
      height: $range-tracker-size
      width: $range-tracker-size

  input
    position: absolute
    opacity: 0
    z-index: 20
    width: 100%
    &:hover + .range-view > .range-tracker
      background-color: $range-tracker-hover-color
    &:focus + .range-view 
      border: 1px solid $range-focus-border-color
</style>