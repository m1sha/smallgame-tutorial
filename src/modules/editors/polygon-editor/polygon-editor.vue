<script setup lang="ts">
import { ref, onMounted } from "vue"
import editor from "./editor-app"
import { ObjectList, ObjectProperties, Toolbar } from "./components"

const container = ref<HTMLDivElement>()
const isInit = ref(false)


onMounted(() => {
  editor.init(container.value!)
  isInit.value = true
})



</script>

<template>
<div class="polygon-editor-page">
  <div class="editor">
    <Toolbar />

    <div class="flex-panel">
      <ObjectList v-if="isInit" />
      <div class="container-wrapper">
        <div ref="container"></div>  
      </div>
      <ObjectProperties v-if="isInit" />
    </div>
    
  </div>
</div>
</template>

<style lang="sass" scoped>
.polygon-editor-page
  display: flex
  justify-content: center
  .editor
    display: flex
    flex-direction: column

    .flex-panel
      display: grid
      grid-template-columns: 300px 1fr 300px
      gap: 12px

      .container-wrapper
        background-color: #888
        padding: 4px
        border-radius: 4px
  

</style>
