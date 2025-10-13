<script setup lang="ts">
import { ref } from 'vue'
import editorApp from '../editor-app'
import { BaseObject, Polygon } from '../code/objects'
import { TextBox } from 'vue3-universal-components'
import { TPoint } from 'smallgame'

const currentObject = ref<BaseObject | null>(null)

const points = ref<TPoint[]>([])

editorApp.editorState.onObjectedSelected = obj => {
  currentObject.value = obj
  if (obj instanceof Polygon) {
    points.value = obj.getPoints()
  }
}
</script>
<template>
  <div v-if="currentObject">
    <div>
      <TextBox v-model="currentObject.rect.x" type="number" caption="X" />
      <TextBox v-model="currentObject.rect.y" type="number" caption="Y" />
      <TextBox v-model="currentObject.rect.width" type="number" caption="Width" />
      <TextBox v-model="currentObject.rect.height" type="number" caption="Height" />
    </div>

    <div>
      <div v-for="point in points">
        <TextBox v-model="point.x" type="number" caption="X" />
        <TextBox v-model="point.y" type="number" caption="Y" />
      </div>
    </div>
  </div>
</template>