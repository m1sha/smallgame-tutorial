<script setup lang="ts">
import { ref } from 'vue';
import { ModalDialog, PushButton, Tab, Tabs, TextBox } from 'vue3-universal-components'
import { useScriptsStore } from '../../store';
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

</script>

<template>
  <ModalDialog :show="show" title="Edit Projects" @closed="show = false">
    <template #body>
      <div class="edit-scripts-content">
        <Tabs v-model="activeTab">
          <Tab name="projects">Projects</Tab>
          <Tab name="categories">Categories</Tab>
        </Tabs>

        <div class="tab-content" v-if="activeTab === 'projects'">
          <div class="project-grid">
            <div class="header">Name</div>
            <div class="header">Cateroty</div>
            <div class="header">Sub Cateroty</div>
            <div class="header"></div>
            <template v-for="item in store.items">
              <div>
                {{ item.name }}
              </div>
              <div>
                {{ store.catagories.find(p => p.id === item.categoryId)?.name ?? '' }}
              </div>
              <div>
                {{ store.catagories.find(p => p.id === item.categoryId)?.subCategories.find(p => p.id === item.subCategoryId)?.name ?? '' }}
              </div>
              <div>
                <PushButton><i class="fa fa-edit"></i></PushButton>
                <PushButton><i class="fa fa-trash"></i></PushButton>
              </div>
            </template>
          </div>
        </div>

        <div class="tab-content" v-if="activeTab === 'categories'">
          <div class="category-grid">
            <div class="header">Cateroty</div>
            <div class="header">Sub Cateroties</div>
            <div class="header">Template</div>
            <div class="header"></div>
            <template v-for="category in store.catagories">
              <div>{{ category.name }}</div>
              <div>
                <div v-for="subCat in category.subCategories">{{ subCat.name }}</div>
              </div>
              <div>{{ category.template }}</div>
              <div>
                <PushButton><i class="fa fa-edit"></i></PushButton>
                <PushButton><i class="fa fa-trash"></i></PushButton>
              </div>
            </template>
          </div>
        </div>

      </div>
    </template>
    <template #footer>
      <PushButton>Cancel</PushButton>
      <PushButton>OK</PushButton>
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

.project-grid, .category-grid  {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 100px;
  max-height: 70vh;
  overflow-y: auto;
  background-color: inherit;
  color: #ccc;
  .header {
    position: sticky;
    top: 0;
    background-color: var(--data-page-bg-color);
    color: #aaa;
    padding-bottom: 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--data-border-color);
  }
}


</style>