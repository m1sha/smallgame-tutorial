<script setup lang="ts">
import { ref } from 'vue'
import { PushButton, Tracker, UploadFile, UploadFileTrigger } from 'vue3-universal-components'

defineProps<{ detection: any, boxes: any[] }>()
const emit = defineEmits<{ postData: [n: string, a?: any] }>()
const trigger = ref<UploadFileTrigger>()
</script>
<template>
  <div class="detection-settings">
        <div class="commands">
          <PushButton @click="trigger?.open()">Upload Image</PushButton>
          <UploadFile ref="trigger" @change="files => emit('postData', 'changed-img', files)" />
        </div>
        
        <div>
          <Tracker v-model="detection.alphaThreshold" :min="1" :max="100" :step="1" caption="Alpha Threshold" />
          <Tracker v-model="detection.connectivity" :min="4" :max="8" :step="4" caption="Connectivity" />
          <Tracker v-model="detection.minSize" :min="1" :max="10" :step="1" caption="Min Size" />
          <Tracker v-model="detection.threshold" :min="0.001" :max="100" :step="0.001" caption="Min Square Threshold" />
        </div>

        <div class="commands">
          <PushButton @click="emit('postData', 'detected')">Detect</PushButton>
        </div>

        <div class="result">
          <span>Detected Boxes: {{ boxes.length }}</span>
        </div>
      </div>
</template>