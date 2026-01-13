<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { DropDownList, FormControl, PushButton, Tracker } from 'vue3-universal-components';
import { useSpriteEditorStore, useSpriteSheetStore } from '../../../store';
import { AnimatedSprite, Game, gameloop, loadBlob, Rect, setSize, SpriteSheet, Surface, TSize } from 'smallgame';
const zoom = ref(4)
const rate = ref(6)
const playing = ref(true)
const container = ref<HTMLDivElement>()

const store = useSpriteSheetStore() //useSpriteEditorStore()
let sprite: AnimatedSprite | null = null
let image: Surface | null = null

const obj = () => {
  if (store.currentObject) return store.currentObject
  return null
}

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
  update()
}

function update () {
  const current = obj()
  createSH (current.batch.start, current.batch.count, current.tileSize)
}

function createSH (s: number, c: number, size: TSize) {
  if (s < 0) return
  if (!image) return
  const sh = new SpriteSheet(image, size, rate.value)
  sh.addBatch('idle', s, c + 1)
  
  sprite = new AnimatedSprite(sh, setSize(size.width * zoom.value, size.height * zoom.value))
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

watch(() => store.currentObject, () => {
  if (!image) {
    load(store.imageFile)
  }
  const current = obj()
  //const obj = store.state.currentObject
  if (!current) {
    sprite = null
    
    return
  }
  update()
  if (current.batch.start > -1) clipId.value = 'current'
}, { deep: true })

const clipId = ref('')
const clips = computed(() => {
  const current = obj()
  if (!current) return []

  if (current.batch.start > -1) {
    const arr = current.batches.map(cl => ({ id: cl.name, ...cl }))
    return [ {id: 'current', name: 'current', start: current.batch.start, count: current.batch.count }, ...arr]
  }
  
  return current.batches.map(cl => ({ id: cl.name, ...cl }))
})

watch(() => clipId.value, () => {
  const current = obj()
  if (!current) return 
  const clip = current.batches.find( p => p.name === clipId.value)
  if (!clip) return

  createSH (clip.start, clip.count, current.tileSize)
})


</script>
<template>
  <div class="preview-panel">
    <FormControl caption="Preview">
      <div class="preview-container" ref="container"></div>
     
      <div class="preview-pane__controls">
        <div class="row">
          <div style="width: 100%;"><DropDownList v-model="clipId" :items="clips" /></div>
          <div>
            <PushButton @click="playStop" title="Plays or stops the animation">
              <span v-if="!playing" class="nf nf-oct-play"></span>
              <span v-if="playing" class="nf nf-fa-stop_circle_o"></span>
            </PushButton>
          </div>
        </div>
        
        <Tracker caption="Zoom" :min="1" :max="12" :step="0.1" v-model="zoom" @update:model-value="update()" />

        <div class="row">
          <div style="width: 100%;">
            <Tracker caption="Rate" :min="1" :max="30" :step="1" v-model="rate" @update:model-value="update()" />
          </div>
          <div>
            <PushButton :disabled="!clipId || clipId === 'current'" title="Set the rate value to the clip">
              <span class="nf set-rate nf-md-set_split"></span>
            </PushButton>
          </div>
        </div>
        
        
        
      </div>
    </FormControl>
  </div>
</template>

<style lang="sass">
  .preview-panel
    position: absolute
    bottom: 4px
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

    
    .preview-pane__controls
      display: flex
      flex-direction: column
      gap: 8px
      padding: 8px 16px
      .row
        display: flex
        gap: 8px
        align-items: center
        .set-rate
          font-size: 1.6em


</style>