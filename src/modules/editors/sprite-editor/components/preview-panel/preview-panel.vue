<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { DropDownList, FormControl, PushButton, Tracker } from 'vue3-universal-components';
import { useSpriteEditorStore } from '../../store';
import { AnimatedSprite, Game, gameloop, loadBlob, Rect, setSize, SpriteSheet, Surface, TSize } from 'smallgame';
const zoom = ref(1)
const rate = ref(1)
const playing = ref(true)
const container = ref<HTMLDivElement>()

const store = useSpriteEditorStore()
let sprite: AnimatedSprite | null = null
let image: Surface | null = null

onMounted (() => {
  const { screen } = Game.create(300, 300, container.value!)

  gameloop(() => {
    screen.clear()
    if (!sprite) return
    sprite.draw(screen)
  })
})

async function load (file: File) {
  image = await loadBlob(file)
  image.imageRendering = 'pixelated'
  createSH (48, 6, setSize(33,32))
}

function createSH (s: number, c: number, size: TSize) {
  if (!image) return
  const sh = new SpriteSheet(image, size, 6)
  sh.addBatch('idle', s, c + 1)
  const z = 4
  sprite = new AnimatedSprite(sh, setSize(size.width * z, size.height * z))
  sprite.rect.absCenter = Rect.size(300, 300).center
}

function playStop () {
  if (!sprite) return
  sprite.playing = !sprite.playing
  playing.value = sprite.playing
}

watch(() => store.imageFile, () => {
  if (!store.imageFile) return
  load(store.imageFile)
})

watch(() => store.state.currentObject, () => {
  const obj = store.state.currentObject
  if (!obj) return
  createSH (obj.batch.start, obj.batch.count, obj.tileSize)
  if (obj.batch.start > -1) clipId.value = 'current'
}, { deep: true })

const clipId = ref('')
const clips = computed(() => {
  const obj = store.state.currentObject
  if (!obj) return []

  if (obj.batch.start > -1) {
    const arr = obj.batches.map(cl => ({ id: cl.name, ...cl }))
    return [ {id: 'current', name: 'current', start: obj.batch.start, count: obj.batch.count }, ...arr]
  }
  
  return obj.batches.map(cl => ({ id: cl.name, ...cl }))
})

watch(() => clipId.value, () => {
  const obj = store.state.currentObject
  if (!obj) return 
  const clip = obj.batches.find( p => p.name === clipId.value)
  if (!clip) return

  createSH (clip.start, clip.count, obj.tileSize)
})


</script>
<template>
  <div class="preview-panel">
    <FormControl caption="Preview">
      <div class="preview-container" ref="container"></div>
      <div class="clip-select">
        <DropDownList v-model="clipId" :items="clips" />
      </div>
      <div class="preview-pane__play">
        
        <PushButton @click="playStop">
          <span v-if="!playing" class="nf nf-oct-play"></span>
          <span v-if="playing" class="nf nf-fa-stop_circle_o"></span>
        </PushButton>
      </div>
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
      margin: 2px 4px
      min-width: 300px
      min-height: 300px
      background-color: rgba(35, 35, 35, 0.4941176471)

    .clip-select
      padding: 8px
    .preview-pane__play
      padding: 8px
      display: flex
      justify-content: center
      span 
        font-size: 1.6em
    .preview-pane__controls
      display: flex
      flex-direction: column
      gap: 8px
      padding: 8px 16px
</style>