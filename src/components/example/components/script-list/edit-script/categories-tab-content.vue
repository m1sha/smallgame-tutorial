<script setup lang="ts">
import './style.css'
import { PushButton } from 'vue3-universal-components'
import { useScriptsStore } from '../../../store'

const store = useScriptsStore()
</script>

<template>
  <div class="tab-content">
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
</template>