<script setup lang="ts">
import './style.css'
import { useScriptsStore } from '../../../store'
import { PushButton } from 'vue3-universal-components'

const store = useScriptsStore()
</script>

<template>
  <div class="tab-content">
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
</template>