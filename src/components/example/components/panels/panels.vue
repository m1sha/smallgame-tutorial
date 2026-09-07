<script setup lang="ts">
import { Point } from 'smallgame';
import { IPanel } from '../../code/panels/panel';
import { watch } from 'vue';

const { items } = defineProps<{ items: IPanel[] }>()
debugger
watch(() => items, () => {
  console.dir(items)
}, { immediate: true })

const prevPoint = Point.zero
let down = false

function onpointerdown (_: IPanel, ev: PointerEvent) {
  prevPoint.moveSelf(ev.clientX, ev.clientY)
  down = true
  const target = ev.currentTarget as HTMLElement
  target.setPointerCapture(ev.pointerId)
}
function onpointermove (panel: IPanel, ev: PointerEvent) {
  if (!down) return
  const point = new Point(ev.clientX, ev.clientY)
  panel.position = point.shift(prevPoint.neg()).shiftSelf(panel.position)
  prevPoint.moveSelf(point)
}
function onpointerup (_: IPanel, ev: PointerEvent) {
  down = false
  const target = ev.currentTarget as HTMLElement
  if (target.hasPointerCapture(ev.pointerId))
    target.releasePointerCapture(ev.pointerId)
}
</script>

<template>
<div class="panel" :style="{ left:  panel.position.x + 'px', top:  panel.position.y + 'px' }" v-for="panel in items" v-show="panel.info.visible">
  <div class="panel-header"
    @pointerdown="onpointerdown(panel, $event)"
    @pointermove="onpointermove(panel, $event)"
    @pointerup="onpointerup(panel, $event)"
    @pointerleave="onpointerup(panel, $event)"
  >{{ panel.title }}</div>
  <div class="panel-content">
    <component :is="panel.component"  :info="panel.info.visible" v-bind="panel.data" @postData="panel.action"  />
  </div>
</div>
</template>

<style lang="css">
.panel {
  position: absolute;
  background-color: #44444490;

  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid #242424;

  .panel-header {
    padding: 4px 8px;
    color: #bbb;
    border-bottom: 1px solid #242424;
    background-color: #31313190;
    cursor: default;
  }

  .panel-content {
    padding: 4px 8px;
  }
}
</style>