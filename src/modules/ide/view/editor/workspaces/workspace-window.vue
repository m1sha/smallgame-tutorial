<script setup lang="ts">
import { Point } from 'smallgame';
import SplitSheetWorkspace from './split-sheet-workspace.vue';
import { useEditorStore } from '../store/editor-store.ts';
import { IWorkspace, isSplitSheetWorkspace } from '../../../domain';

const { workspace } =  defineProps<{ workspace: IWorkspace }>()
const store = useEditorStore()
const workspaces = store.editor.workspaces

const prevCoord = Point.zero
let down = false
const onPointerdown = (e: PointerEvent) => {
  workspaces.addSelected(workspace)
  down = true
  prevCoord.moveSelf(e.clientX, e.clientY)
  const currentTarget = e.currentTarget as HTMLElement
  currentTarget.setPointerCapture(e.pointerId)

  console.log('DOWN')
  e.stopPropagation()
}

const onPointermove = (e: PointerEvent) => {
  if (!down) return

  const currCoord = new Point(e.clientX, e.clientY)
  const shift = currCoord.shift(prevCoord.neg())
  
  workspace.position = shift.shift(workspace.position)
  prevCoord.moveSelf(e.clientX, e.clientY)
  const hypot = Math.hypot(shift.x, shift.y)
 
  console.log('MOVE', hypot)
}

const onPointerup = (e: PointerEvent) => {
  down = false
  const currentTarget = e.currentTarget as HTMLElement
  if (currentTarget.hasPointerCapture(e.pointerId))
    currentTarget.releasePointerCapture(e.pointerId)
}
</script>

<template>
  <div 
    @dragstart.stop 
    class="workspace" 
    :class="{ selected: workspaces.isSelected(workspace) }"
    :style="{ 
      top: workspace.position.y + 'px', 
      left: workspace.position.x + 'px',
      minWidth: workspace.size.width + 'px',
      minHeight: workspace.size.height + 'px',
    }"
    
    >
    
    <div 
      class="header" 
      
      @pointerdown="onPointerdown"
      @pointermove="onPointermove"
      @pointerup="onPointerup"
      >
      <span>
        {{ workspace.title }}
      </span>
      <!-- <div class="menu-trigger-button" role="button">
        <i class="fa fa-chevron-down"></i>
      </div> -->
    </div>

    <div class="content">
      <SplitSheetWorkspace v-if="isSplitSheetWorkspace(workspace)" :workspace />
    </div>
  </div>
</template>

<style lang="css">
.workspace {
  --br: 6px;
  position: absolute;
  left: 100px;
  top: 100px;
  display: flex;
  flex-direction: column;
  padding: 4px;

  &.selected {
    .header, .content {
      border-color: #7a8796;
      background-color: #242629;
    }
    
    .header {
      border-bottom-color: #242424;
    }
  }

  .header {
    z-index: 1;
    border: 1px solid #242424;
    border-bottom: none;
    border-radius: var(--br) var(--br) 0 0;
    background-color: #242424;
    color: #bbb;
    width: fit-content;

    display: flex;
    gap: 8px;

    span {
      min-width: 20ch;
      padding: 4px 8px;
      font-size: 16px;
      font-weight: 300;
    }

    .menu-trigger-button {
      display: inline-block;
      padding: 4px 8px;
      background-color: #2b2b2b;
      color: #999;
      border-radius: 0 var(--br) 0 0 ;
      &:hover {
        background-color: #2e2e2e;
        color: #bbb;
      }
    }
  }
  .content {
    z-index: -1;
    margin-top: -2px;
    padding: 4px;
    padding-top: 6px;
    background-color: #242424;
    border: 1px solid #242424;
    flex: 1;
    position: relative;
    border-radius: 0 var(--br) var(--br) var(--br);
  }
}
</style>