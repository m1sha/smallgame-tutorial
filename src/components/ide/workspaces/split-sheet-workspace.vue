<script setup lang="ts">
import { ref, watch } from 'vue';
import { ISplitSheetWorkspace } from '../../../modules/ide/workspaces/split-sheet-workspace'
import { loadImage, Sketch } from 'smallgame';
import { findSpriteBoundingBoxes } from '../../../modules/shared';

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
    <img draggable="false" v-if="dataUrl" :src="dataUrl" />
  </div>
</template>

<style lang="css">
.split-sheet-workspace {
  width: 100%; 
  height: 100%;

  --local-even-color: #333;
  --local-odd-color: #282828;
  --local-cell-size: 8px;

  background:
    conic-gradient(var(--local-even-color) 25%, var(--local-odd-color) 0 50%, var(--local-even-color) 0 75%, var(--local-odd-color) 0)
    0 0 / calc(var(--local-cell-size) * 2) calc(var(--local-cell-size) * 2);

  img {
    object-fit: contain;
  }
}
</style>