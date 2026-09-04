<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { AssetExplorer } from './asset-explorer'
import { GridBg } from './bg'
import { useEditorStore } from './store'
import { Point, Size } from 'smallgame'
import { WorkspaceWindow } from './workspaces'
import { ChoiceModal, choseModal } from './modals'
import { IPlugin } from '../../../modules/ide'

defineProps<{ plugins: IPlugin[] }>()

const store = useEditorStore()
const editor = store.editor
const viewport = editor.viewport
const viewportStyle = computed(() => ({
  '--zoom': `${viewport.zoom}`,
  '--pan-x': `${viewport.offset.x}px`,
  '--pan-y': `${viewport.offset.y}px`,
}))

onMounted(() => {
  editor.workspaces.create('Window 1', { position: new Point(100, 50), size: new Size(600, 500)})
  editor.workspaces.create('Window 2', { position: new Point(1000, 50)})
})

let mouseDown = false
let prevMousePos: Point = Point.zero

function onPointerDown (event: PointerEvent) {
  mouseDown = true
  // const target = event.target as HTMLElement
  prevMousePos.moveSelf(event.clientX, event.clientY)
  //store.eventController.onPointerDown(event)
  const viewport = event.currentTarget as HTMLElement
  viewport.setPointerCapture(event.pointerId)
}

function onPointerMove (event: PointerEvent) {
  if (!mouseDown) return
  const shift = prevMousePos.shift(-event.clientX, -event.clientY)
  prevMousePos.moveSelf(event.clientX, event.clientY)
  viewport.panBy(shift.neg())
  //store.eventController.onPointerMove(event)
}

function onPointerUp (event: PointerEvent) {
  prevMousePos.moveSelf(0, 0)
  mouseDown = false
  //store.eventController.onPointerUp(event)
}

function zoomViewport(event: WheelEvent) {
  event.preventDefault()
  const currentTarget = event.currentTarget as HTMLElement
  const rect = currentTarget.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  viewport.zoomAt(event.deltaY, mouseX, mouseY)
}

const imgPath = ref('')
async function onDrop(event: DragEvent) {
  const assetImg = event.dataTransfer?.getData('assetImg')
  imgPath.value = assetImg

  const currentTarget = event.currentTarget as HTMLElement
  if (!currentTarget) return
  
  const result = await choseModal(['Split Sheet', 'Create Sprite Sheet'], { title: 'ACTION' })
  if (result.ok) {
    
    const rect = currentTarget.getBoundingClientRect()
    
    const screenX = event.clientX - rect.left
    const screenY = event.clientY - rect.top

    if (result.chosen === 'Split Sheet') {
      const cur = new Point(screenX, screenY)
      const point = viewport.screenToWorld(cur)
      editor.workspaces.createSplitSheet('SplitSheet', assetImg, { position: point })
    }
  }
}

</script>

<template>
  <div 
    class="editor" 
    :style="viewportStyle"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @wheel="zoomViewport"
    @dragover.prevent 
    @drop="onDrop"
    >
    <GridBg 
      :cell-size="20" 
      :offset-x="viewport.offset.x" 
      :offset-y="viewport.offset.y" 
      :zoom="viewport.zoom" 
      line-color="#232323" 
      :show="true"  
      @drop.prevent
    />
    <div @drop.prevent class="world">
      <WorkspaceWindow :workspace v-for="workspace in editor.workspaces.items" />
    </div>
    <AssetExplorer />
  </div>
  <ChoiceModal />
</template>

<style lang="css">
.editor {
  position: relative; 
  
  height: calc(100vh - 45px);
  overflow: hidden;
  user-select: none;
   -webkit-user-select: none;
  touch-action: none;
  -webkit-user-drag: none;

  .world {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    transform:
      translate(var(--pan-x), var(--pan-y))
      scale(var(--zoom));
  }
}
</style>