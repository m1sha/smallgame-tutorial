<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Tab, Tabs } from 'vue3-universal-components';
import { JsonDocument, RemoteStorage, Space } from '../../../../../utils';
const currentTab = ref('spaces')
const spaces = ref<Space[]>([])
const docs = ref<JsonDocument[]>([])
onMounted(async () => {
  spaces.value = await RemoteStorage.spaceList()
  docs.value = await RemoteStorage.documentList()
})

</script>
<template>
  <div class="remote-store-panel">
    <Tabs v-model="currentTab">
      <Tab name="spaces">Spaces</Tab>
      <Tab name="media">Media</Tab>
      <Tab name="documents">Documents</Tab>
    </Tabs>

    <div class="tab-content" v-if="currentTab === 'spaces'">
      <div>
        <button><i class="fa fa-plus"></i></button>
        <button><i class="fa fa-refresh"></i></button>
      </div>

      <div class="table" style="grid-template-columns: repeat(3, 1fr);">
        <div class="header">
          <div class="header-column">Name</div>
          <div class="header-column">Media</div>
          <div class="header-column">Documents</div>
        </div>
        <div class="row" v-for="space in spaces">
          <div class="header-column">{{ space.name }}</div>
          <div class="header-column">{{ space.mediaCount }}</div>
          <div class="header-column">{{ space.documentCount }}</div>
        </div>
      </div>
    </div>

    <div class="tab-content" v-if="currentTab === 'media'">
      
    </div>

    <div class="tab-content" v-if="currentTab === 'documents'">
      <div class="table" style="grid-template-columns: repeat(2, 1fr);">
        <div class="header">
          <div class="header-column">Name</div>
          <div class="header-column">Size</div>
          
        </div>
        <div class="row" v-for="space in docs">
          <div class="header-column">{{ space.name }}</div>
          <div class="header-column">{{ space.size }}</div>
          
        </div>
      </div>
    </div>


  </div>
</template>

<style lang="css">
.remote-store-panel {

  .tab {
    font-size: 14px;
    color: #888;
  }

  .tab-content {
    margin: 18px 0;

    display: flex;
    flex-direction: column;
    gap: 12px;
    
  }

  .table {
    display: grid;
    
    font-size: 12px;
    color: #bbb;

    .header, .row {
      display: contents;
    }
  }
}
</style>