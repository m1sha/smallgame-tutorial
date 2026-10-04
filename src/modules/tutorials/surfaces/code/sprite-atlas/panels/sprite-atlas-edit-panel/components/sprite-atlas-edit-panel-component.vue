<script setup lang="ts">
import { Tab, Tabs } from 'vue3-universal-components'
import { SpriteAtlasEditPanelData } from '../sprite-atlas-edit-panel-data'
import { computed } from 'vue'
import DetectRects from './detect-rects.vue'
import RectsEditor from './rects-editor.vue'

const props = defineProps<SpriteAtlasEditPanelData>()
const emit = defineEmits<{ postData: [actionName: string, args?: any ]}>()

const tabName = computed({
  get: () => {
    return ['edit-rect', 'move-sprite'].includes(props.editor.mode) 
      ? 'editor' 
      : props.editor.mode
  },

  set: (value: string) => {
    value === 'editor' ? props.editor.mode = 'edit-rect' : props.editor.mode = value as any
    emit('postData', 'changed-mode', props.editor.mode)
  }
})

</script>

<template>
  <div class="sprite-atlas-edit-panel">
    <Tabs v-model="tabName">
      <Tab name="detection">Detection</Tab>
      <Tab name="editor">Editor</Tab>
      <Tab name="export">Export</Tab>
    </Tabs>

    <div class="tab-content" v-if="tabName === 'detection'">
      <DetectRects 
        :detection 
        :boxes 
        @post-data="(actionName, args) => emit('postData', actionName, args)" 
        />
    </div>

    <div class="tab-content" v-if="tabName === 'editor'">
      <RectsEditor :boxes  />
    </div>
    
  </div>
</template>

<style lang="css">
.sprite-atlas-edit-panel {
  width: 18vw;
  padding-bottom: 24px;

  .tab-content {
    margin-top: 18px;
  }

  .detection-settings {
    display: flex;
    flex-direction: column;
    gap: 22px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .result {
      span {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .boxes-list {
    max-height: 40vh;
    overflow-y: auto;

    grid-template-columns: max-content repeat(4, max-content);
    align-items: center;

    .header-column {
      text-align: right;
    }

    .row {
      .box-num {
        font-size: 12px;
        color: #999;
        width: 4ch;
        text-align: right;
      }
      .vue3-uui__input-wrapper, .vue3-uui__textbox {
        width: fit-content;
      }
      input[type="text"]  {
        width: 6ch;
        text-align: right;
      }
    }
  }
}
</style>