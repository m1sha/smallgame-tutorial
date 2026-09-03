<script setup lang="ts">
import { ref, watch } from 'vue';
import { ISplitSheetWorkspace } from '../../../modules/ide/workspaces/split-sheet-workspace'
import { loadImage, Sketch } from 'smallgame';
import { findSpriteBoundingBoxes } from '../../../modules/shared';
import { ChessBg, GridBg } from '../bg';

const { workspace } = defineProps<{ workspace: ISplitSheetWorkspace }>()
const dataUrl = ref('')

watch(() => workspace.url, async () => {
  if (!workspace.url) return

  const img = await loadImage(workspace.url)
  const rects = findSpriteBoundingBoxes(img.pixels.imageData)
  const sketch = new Sketch()
  for (const rect of rects) {
    sketch.rect({ stroke: 'green' }, rect)
  }
  sketch.draw(img)
  dataUrl.value = img.toDataURL()
}, { immediate: true })

</script>

<template>
  <div class="split-sheet-workspace">
    <ChessBg :cell-size="8" :offset-x="0" :offset-y="0" even-color="#3b3b3b" odd-color="#555" :zoom="1"  />
    <img draggable="false" v-if="dataUrl" :src="dataUrl" />
  </div>
</template>

<style lang="css">
.split-sheet-workspace {
  position: relative;
  width: max-content; 
  height: max-content;

  .chess-pattern {
    display: flex;
    flex: 1;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
  }

  img {
    position: absolute;
    object-fit: contain;
  }
}
</style>