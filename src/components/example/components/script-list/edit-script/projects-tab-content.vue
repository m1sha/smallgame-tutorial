<script setup lang="ts">
import { useScriptsStore } from '../../../store'
import { DropDownList, PushButton, TextBox } from 'vue3-universal-components'
import { GridTable, IHeader } from '../../../../base'
import { IScriptListItem } from '../../../code'
import { ref } from 'vue'

const store = useScriptsStore()
const header: IHeader<IScriptListItem>[] = [
  { key: 'name', name: 'Name' },
  { key: 'categoryId', name: 'Cateroty' },
  { key: 'subCategoryId', name: 'Sub Cateroty' }
]

const getCategoryName = (item: IScriptListItem) => store.catagories
  .find(p => p.id === item.categoryId)?.name ?? ''

const getSubCategoryName = (item: IScriptListItem) => store.catagories
  .find(p => p.id === item.categoryId)?.subCategories
  .find(p => p.id === item.subCategoryId)?.name ?? ''

const editIndex = ref(-1)
const deteteIndex = ref(-1)
const editItem = ref<IScriptListItem | null>()

const onEditClick = (item: IScriptListItem, index: number) => {
  editItem.value = { ...item }
  editIndex.value = index
}

const onEditConfirm = () => {
  if (!editItem.value) return
  store.addEditItem(editItem.value)
  editIndex.value = -1
  editItem.value = null
}

const onDeleteConfirm = (id: number) => {
  store.addDeleteItemId(id)
  deteteIndex.value = -1
}

</script>

<template>
  <div class="tab-content">
    <GridTable :headers="header" :items="store.items" @replace="store.replaceItem">
      <template #name="{ item, index }">
        <TextBox v-if="editIndex === index && editItem" v-model="editItem.name" />
        <text v-else>{{ item.name }}</text>
      </template>
      <template #categoryId="{ item, index }">
        <!--@vue-skip-->
        <DropDownList v-if="editIndex === index && editItem" v-model="editItem.categoryId" :items="store.catagories" />
        <text v-else>{{ getCategoryName(item) }}</text>
      </template>
      <template #subCategoryId="{ item, index }">
        <!--@vue-skip-->
        <DropDownList v-if="editIndex === index && editItem" v-model="editItem.subCategoryId" :items="store.catagories.find(p => p.id === editItem.categoryId).subCategories ?? []" />
        <text v-else>{{ getSubCategoryName(item) }}</text>
      </template>
      <template #action-column="{ item, index }">
        <template v-if="index === editIndex">
          <PushButton @click="onEditConfirm"><i class="fa fa-check"></i></PushButton>
          <PushButton @click="editIndex = -1 "><i class="fa fa-ban"></i></PushButton>
        </template>
        <template v-if="index === deteteIndex">
          <PushButton @click="onDeleteConfirm(item.id)"><i class="fa fa-check"></i></PushButton>
          <PushButton @click="deteteIndex = -1 "><i class="fa fa-ban"></i></PushButton>
        </template>
        <template v-if="editIndex < 0 && deteteIndex < 0">
          <PushButton><i class="fa fa-arrow-up-right-from-square"></i></PushButton>
          <PushButton @click="onEditClick(item, index)"><i class="fa fa-edit"></i></PushButton>
          <PushButton @click="deteteIndex = index "><i class="fa fa-trash"></i></PushButton>
        </template>
      </template>
    </GridTable>
  </div>
</template>