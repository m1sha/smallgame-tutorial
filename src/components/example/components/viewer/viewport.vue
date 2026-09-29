<script setup lang="ts">
import { PushButton } from 'vue3-universal-components'
import { IViewport } from '../../../../modules/shared/viewer/ui/viewport'

defineProps<{ viewport: IViewport, usePan: boolean }>()
const emit = defineEmits<{
  action: [name: 'pan' | 'home' | 'fit' | 'zoomIn' | 'zoomOut']  
}>()

</script>
<template>
  <div class="viewport-wrapper">

  
<div class="viewport">
  <div title="Cursor Position">
    <PushButton title="Pan" :class="{ selected: usePan }" @click="emit('action', 'pan')">
      <i class="fa fa-hand" />
    </PushButton>
    <span style="transform: scaleX(-1) rotateZ(-5deg); color: #777; "><i class="fa-solid fa-arrow-pointer"></i></span>
    <span class="cur">
      {{ viewport.cursor.x.toFixed(0) }}<span class="spliter">:</span>{{ viewport.cursor.y.toFixed(0) }}
    </span>
  </div>

  <div title="Viewer Viewport Zoom">
    <PushButton title="Original size" @click="emit('action', 'home')">
      <i class="fa fa-home" />
    </PushButton>
    <PushButton title="Fit to display" @click="emit('action', 'fit')">
      <i class="fa fa-display" />
    </PushButton>
    <PushButton title="Zoom in" @click="emit('action', 'zoomIn')" >
      <i class="fa fa-magnifying-glass-plus" />
    </PushButton>
    <span class="zoom">
      {{ (viewport.zoom * 100).toFixed(0) }}%
    </span>
    <PushButton title="Zoom out" @click="emit('action', 'zoomOut')">
      <i class="fa fa-magnifying-glass-minus"  />
    </PushButton>
  </div>
</div>
</div>
</template>

<style lang="css">
.viewport-wrapper  {
  position: absolute;
  bottom: 8px;
  right: 8px;
}
.viewport {
  display: flex;
  background-color: #232323;
  
  
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  border-radius: 8px;

  button.push-button {
    font-size: 10px;
    padding: 4px;
    min-width: 24px;
    background-color: #2f2f2f;
    border: none;
    &.selected {
      background-color: #464;
      color: #eee;
    }
  }

  & > div {
    display: flex;
    gap: 4px;
    cursor: default;
    align-items: center;
    

    span {
      font-size: 11px;
      &:first-child {
        color: #717171;
      }

      &.zoom {
        width: 5ch;
        text-align: center;
      }

      &:last-child {
        color: #bbb;

        &.cur {
          width: 11ch;
        }

        &.offset {
          width: 14ch;
        }

        
        
        span {
          color: #888;
          margin: 0 1px;
        }
        
      }
    }
  }
}
</style>