<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useEditorStore } from "../store/editor-store"
import Toolbar from "./toolbar/toolbar.vue"
import ToolCursor from "./tool-cursor.vue"

const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const store = useEditorStore()

onMounted(() => {
  store.createApp(container.value!, fps.value!)
})

</script>
<template>
  <div>
  <Toolbar />
  <div class="viewer__container">
    
    <div class="viewer__content">
      <div class="fps" ref="fps"></div>
      <ToolCursor />
      <div ref="container"></div>
    </div>

    <div class="viewer__v_scroller">
      <div style="height: 810px;"></div>
    </div>
    <div class="viewer__h_scroller">
      <div style="width: 810px;"></div>
    </div>
    <div class="viewer__sq"></div>
  </div>
</div>
  
</template>

<style lang="sass" scoped>

.viewer__container
  display: grid
  grid-template-columns: 1fr 18px
  grid-template-rows: 1fr 18px
  height: calc( 100vh - 280px )
  position: relative

  .viewer__v_scroller, .viewer__h_scroller, .viewer__sq
    background-color: #383838
  
  .viewer__v_scroller
    overflow-y: scroll

  .viewer__h_scroller
    overflow-x: scroll

</style>