<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { FormControl, Tracker } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../store';
import { AnimatedSprite, Game, gameloop, loadBlob, Rect, setSize, SpriteSheet } from 'smallgame';
const zoom = ref(1)
const rate = ref(1)
const container = ref<HTMLDivElement>()

const store = useSpriteEditorStore()
let sprite: AnimatedSprite | null = null

onMounted (() => {
  const { screen } = Game.create(300, 300, container.value!)

  gameloop(() => {
    screen.clear()
    if (!sprite) return
    sprite.draw(screen)
  })
})

async function load (file: File) {
  const img = await loadBlob(file)
  img.imageRendering = 'pixelated'
  const sh = new SpriteSheet(img, setSize(33,32), 9)
  sh.addBatch('idle', 6, 6)
  const z = 8
  sprite = new AnimatedSprite(sh, setSize(33 * z,32 * z))
  sprite.rect.absCenter = Rect.size(300, 300).center
}

watch(() => store.imageFile, () => {
  if (!store.imageFile) return
  load(store.imageFile)
})

watch(() => rate.value, () => {
  if (!sprite) return
  //sprite.spriteSheet. = rate.value
})


</script>
<template>
  <div class="preview-panel">
    <FormControl caption="Preview">
      <div class="preview-container" ref="container"></div>
      <div class="preview-pane__controls">
        <Tracker caption="Zoom" :min="1" :max="8" :step="0.1" v-model="zoom" />
        <Tracker caption="Rate" :min="1" :max="30" :step="0.1" v-model="rate" />
      </div>
    </FormControl>
  </div>
</template>

<style lang="sass">
  .preview-panel
    position: absolute
    top: 4px
    left: 8px
    background-color: rgba(55, 55, 55, 0.4941176471)
    border: 1px solid var(--panel-border)
    display: flex
    flex-direction: column
    gap: 16px

    .preview-container
      min-width: 300px
      min-height: 300px
      background-color: rgba(35, 35, 35, 0.4941176471)

    .preview-pane__controls
      display: flex
      flex-direction: column
      gap: 8px
      padding: 8px 16px
</style>