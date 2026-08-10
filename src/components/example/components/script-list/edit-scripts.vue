<script setup lang="ts">
import { ref } from 'vue';
import { ModalDialog, PushButton, Tab, Tabs } from 'vue3-universal-components'
import ProjectsTabContent from './edit-script/projects-tab-content.vue';
import CategoriesTabContent from './edit-script/categories-tab-content.vue';
import { useScriptsStore } from '../../store/script-store.ts';

export interface IScriptEditor {
  open (): void
}

const activeTab = ref('projects')
const show = ref(false)
const store = useScriptsStore()

defineExpose({
  open () {
    show.value = true
  }
})

async function saveData () {
  const result = await store.saveData()
  if (result instanceof Error) return
  show.value = false
}
</script>

<template>
  <ModalDialog :show="show" title="Edit Projects" @closed="show = false">
    <template #body>
      <div class="edit-scripts-content">
        <Tabs v-model="activeTab">
          <Tab name="projects">Projects</Tab>
          <Tab name="categories">Categories</Tab>
        </Tabs>

        <ProjectsTabContent v-if="activeTab === 'projects'" />
        <CategoriesTabContent v-if="activeTab === 'categories'" />

      </div>
    </template>
    <template #footer>
      <PushButton @click="show = false">Cancel</PushButton>
      <PushButton @click="saveData()">OK</PushButton>
    </template>
  </ModalDialog>
</template>

<style lang="css">
.edit-scripts-content {
  height: 75vh;
  width: 40vw;
  margin-top: 8px;
  margin-bottom: 32px;

  .tab-content {
    margin-top: 16px;
  }
}

</style>