<script setup lang="ts">
import { Point } from 'smallgame';
import { IPanel } from '../../code/panels/panel';
import { ref } from 'vue';
import { removeItem } from 'smallgame/src/utils';
//import { watch } from 'vue';

const { items } = defineProps<{ items: IPanel<any>[] }>()
const minList = ref<string[]>([])
const isMin = (id: string) => minList.value.some(p => p === id)
const addFromMinList = (id: string) => { minList.value.push(id) }
const removeFromMinList = (id: string) => { removeItem(minList.value, p => p === id )}

//watch(() => items, () => {
//  //console.dir(items)
//}, { immediate: true })

const prevPoint = Point.zero
let down = false

function onpointerdown (_: IPanel<any>, ev: PointerEvent) {
  prevPoint.moveSelf(ev.clientX, ev.clientY)
  down = true
  const target = ev.currentTarget as HTMLElement
  target.setPointerCapture(ev.pointerId)
}
function onpointermove (panel: IPanel<any>, ev: PointerEvent) {
  if (!down) return
  const point = new Point(ev.clientX, ev.clientY)
  panel.position = point.shift(prevPoint.neg()).shiftSelf(panel.position)
  prevPoint.moveSelf(point)
}
function onpointerup (_: IPanel<any>, ev: PointerEvent) {
  down = false
  const target = ev.currentTarget as HTMLElement
  if (target.hasPointerCapture(ev.pointerId))
    target.releasePointerCapture(ev.pointerId)
}
</script>

<template>
<div class="panel" :style="{ left:  panel.position.x + 'px', top:  panel.position.y + 'px' }" v-for="panel in items" v-show="panel.info.visible && !isMin(panel.id)">
  <div class="panel-header"
    @pointerdown="onpointerdown(panel, $event)"
    @pointermove="onpointermove(panel, $event)"
    @pointerup="onpointerup(panel, $event)"
    @pointerleave="onpointerup(panel, $event)"
  >
  <span>{{ panel.title }}</span>
  <div>
    <button title="Minimize" @pointerdown.stop @click.stop="addFromMinList(panel.id)"><i class="fa fa-window-minimize" /></button>
  </div>

</div>
  <div class="panel-content">
    <component :is="panel.component"  :info="panel.info.visible" v-bind="panel.data" @postData="panel.action"  />
  </div>
</div>


<div class="panels-bar" >
  <div 
    v-for="panel in items" :class="{ min: isMin(panel.id)}"
    @click.stop="removeFromMinList(panel.id)"
    >{{ panel.title }}
  </div>
</div>

</template>

<style lang="css">
.panels-bar {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #242424;
  width: fit-content;
  display: flex;
  gap: 3px;

  & > div{
    padding: 4px 8px;
    font-size: 12px;
   
    cursor: pointer;
    
    
    min-width: 80px;
    text-align: center;
    border: 1px solid #333;
    background-color: #2a2a2a;
    color: #bbb;

    &.min {
      border: 1px solid #484848;
      background-color: #313131;
      color: #b8b8b8; 
    }

    &:hover {
      border: 1px solid #484848;
      background-color: #2f2f2f;
      color: #b8b8b8; 
    }

  }
}

.panel {
  position: absolute;
  background-color: #2f2f2fF0;

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

    display: flex;

    & > div {
      margin-left: auto;
      button {
        padding: 4px;
        min-width: 24px;
        border: none;
      }
    }
  }

  .panel-content {
    padding: 4px 8px;
  }
}
</style>