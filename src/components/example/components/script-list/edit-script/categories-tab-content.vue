<script setup lang="ts">
import { useScriptsStore } from '../../../store'
import { GridTable, IHeader } from '../../../../base';
import { IScriptCategory } from '../../../code';
import { PushButton } from 'vue3-universal-components'

const headers: IHeader<IScriptCategory> [] = [
  { key: 'name', name: 'Cateroty' },
  { key: 'subCategories', name: 'Sub Cateroties' },
  { key: 'template', name: 'Template' },
]

const store = useScriptsStore()
</script>

<template>
  <div class="tab-content">
    <GridTable :headers :items="store.catagories" @replace="store.replaceCategory">
      <template #subCategories="{ item }">
        <div v-if="item.subCategories && item.subCategories.length" v-for="subCat in item.subCategories">{{ subCat.name }}</div>
        <span v-else></span>
      </template>
      <template #action-column>
        <PushButton><i class="fa fa-edit"></i></PushButton>
        <PushButton><i class="fa fa-trash"></i></PushButton>
      </template>
    </GridTable>
  </div>
</template>