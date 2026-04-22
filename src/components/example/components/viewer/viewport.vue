<script setup lang="ts">
import { IViewport } from '../../code'

defineProps<{ viewport: IViewport }>()

</script>
<template>
<div class="viewport">
  <div title="Cursor Position">
    <span>C</span>
    <span class="cur">
      {{ viewport.cursor.x.toFixed(0) }}<span class="spliter">:</span>{{ viewport.cursor.y.toFixed(0) }}
    </span>
  </div>
  <div title="Viewer Viewport Offset">
    <span>O</span>
    <span class="offset">
      {{ viewport.offset.x.toFixed(0) }}<span class="spliter">:</span>{{ viewport.offset.y.toFixed(0) }}
    </span>
  </div>
  <div title="Viewer Viewport Zoom">
    <span>Z</span>
    <span class="zoom">
      {{ viewport.zoom.toFixed(3) }}
    </span>
  </div>
</div>
</template>

<style lang="css">
.viewport {
  display: flex;
  
  height: 26px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;

  & > div {
    display: flex;
    gap: 4px;
    cursor: default;
    

    span {
      font-size: 11px;
      &:first-child {
        color: #717171;
      }

      &:last-child {
        color: #bbb;

        &.cur {
          width: 8ch;
        }

        &.offset {
          width: 12ch;
        }

        &.zoom {
          width: 5ch;
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