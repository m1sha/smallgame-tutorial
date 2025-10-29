<script setup lang="ts">
import { ref } from 'vue'
import editorApp from '../editor-app'
import { BaseObject, ImageObject, Polygon } from '../code/objects'
import { TextBox, KeyValue } from 'vue3-universal-components'
import { Rect, TPoint } from 'smallgame'

const currentObject = ref<BaseObject | null>(null)

const points = ref<TPoint[]>([])
const rect = ref(Rect.zero)

editorApp.editorState.onObjectedSelected = obj => {
  currentObject.value = obj
  points.value = []
  if (obj instanceof Polygon) {
    points.value = obj.getPoints()
    rect.value = obj.rect
  }

  if (obj instanceof ImageObject) {
    rect.value.moveSelf(obj.imageRect)
    rect.value.resizeSelf(obj.imageRect)
  }
}
</script>
<template>
  <div v-if="currentObject">
    <div v-if="currentObject.type === 'image'">
      <TextBox v-model="rect.x" type="number" caption="X" />
      <TextBox v-model="rect.y" type="number" caption="Y" />
      <TextBox v-model="rect.width" type="number" caption="Width" />
      <TextBox v-model="rect.height" type="number" caption="Height" />
    </div>

    <div v-if="currentObject.type === 'polygon'">
      <label for="">Show Arrows</label> <input type="checkbox" checked />
    </div>

    <div>
      <div v-for="point in points">
        <div style="display: flex; gap: 8px;">
          <KeyValue header="X" :value="point.x" />
          <KeyValue header="Y" :value="point.y" />
        </div>
        <!-- <TextBox v-model="point.x" type="number" caption="X" />
        <TextBox v-model="point.y" type="number" caption="Y" /> -->
      </div>
    </div>
  </div>
</template>