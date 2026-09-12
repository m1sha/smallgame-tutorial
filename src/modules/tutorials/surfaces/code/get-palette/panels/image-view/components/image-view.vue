<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ImageViewData } from '../image-view-data'
import { usePointerHandler } from '../../shared';
import { loadBlob } from 'smallgame';
const props = defineProps<ImageViewData>()
const container = ref<HTMLDivElement>()
const emit = defineEmits<{ postData: [ actionName: string, args?: any ]}>()
const fileupload = ref<HTMLInputElement>()
const { onAction, pointermove, pointerdown, pointerup, wheel } = usePointerHandler()

const downloading = ref(false)

onMounted(() => {
  props.setContainer(container.value!, event => {
    downloading.value = event === 'downloading'
  })
})

onAction((actionName, args) => emit('postData', actionName, args))

const onFileUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  const file = target.files[0]
  if (!file) return
  const image = await loadBlob(file)
  emit('postData', 'upload', { image, name: file.name })
}

</script>
<template>
  <div class="image-view-panel">
    <div class="toolbar">
      <button @click="emit('postData', 'zoom-in')" title="Zoom In"><i class="fa fa-magnifying-glass-plus" /></button>
      <button @click="emit('postData', 'zoom-out')" title="Zoom Out"><i class="fa fa-magnifying-glass-minus" /></button>
      <button @click="emit('postData', 'home')" title="Original Size"><i class="fa fa-home"></i></button>
      <button @click="emit('postData', 'fit')" title="Scale To Fit"><i class="fa fa-minimize"></i></button>
      <div class="tool-separator"></div>
      
      <button @click="fileupload?.click()" title="Upload an Image"><i class="fa-solid fa-upload"></i></button>
      <button @click="emit('postData', 'download')" title="Download an Image" :disabled="downloading"><i class="fa-solid fa-download"></i></button>
      <input type="file" style="display: none;" ref="fileupload" @change="onFileUpload" />
    </div>
    <div 
      class="preview" ref="container"
      @pointerdown.stop="pointerdown"
      @pointermove.stop="pointermove"
      @pointerup.stop="pointerup"
      @pointerleave.stop="pointerup"
      @wheel.stop="wheel"
      >
    </div>
  </div>
</template>


<style lang="css">
.image-view-panel {
  min-width: 800px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .toolbar {
    display: flex;
    gap: 1px;
    .tool-separator {
      border-left: 1px solid #383838;
      width: 1px;
      margin: 0 8px;
    }
  }

  .preview {
    width: 100%;
    height: 100%;
    flex: 1;
    margin-bottom: 12px;

    --cell-size: 10px;
    --color-1: #333;
    --color-2: #3f3f3f;
    --zoom: 1;
    --pan-x: 0;
    --pan-y: 0;

    background-size: calc(var(--cell-size) * var(--zoom)) calc(var(--cell-size) * var(--zoom));
    background-image: conic-gradient(var(--color-1) 25%, var(--color-2) 0 50%, var(--color-1) 0 75%, var(--color-2) 0);
    background-position: var(--pan-x) var(--pan-y);
  }
}
</style>