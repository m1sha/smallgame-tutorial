<script setup lang="ts">
import { computed, ref } from 'vue'
import { DropDownList, ModalDialog, PushButton, TextBox } from 'vue3-universal-components'
import { Client, OkResult } from '../../../../api'
import { useScriptsStore } from '../../store'
import { useRouter } from 'vue-router'
import { IScriptListItem } from '../../code'

export interface IScriptCreator {
  open (cat: string, subCat: string): void
}

const router = useRouter()
const store = useScriptsStore()
const name = ref('')
const title = ref('')
const categoryId = ref('')
const subCategoryId = ref('')
const canCreate = computed(() => Boolean(name.value) && Boolean(title.value))

const show = ref(false)
defineExpose({
  open (cat: string, subCat: string) {
    show.value = true
    categoryId.value = store.catagories.find(p => p.name === cat)?.id.toString() ?? ''
    subCategoryId.value = store.catagories.find(p => p.name === cat)?.subCategories.find(p => p.name === subCat)?.id.toString() ?? ''
    name.value = ''
    title.value = ''
  }
})

async function createProject () {
  const sub = subCategoryId.value ?? ''
  const item = await Client.get<IScriptListItem>(`create-project/${name.value}/${title.value}/${categoryId.value}/${sub}`)
  if (item instanceof Error) return
  show.value = false
  router.replace({ name: 'Sandbox', params: { name: title.value.replaceAll(' ', '_') }})
  await Client.get<OkResult>(`openInCode/?path=${item.codeDir}`)
}

function onNameChanged () {}
function onTitleChanged () {
  name.value = title.value.toLocaleLowerCase().replaceAll(' ', '-')
}

</script>

<template>
  <ModalDialog :show="show" title="Create Project" @closed="show = false">
    <template #body>
      <div class="create-project-content">
        <div class="category">
          <div class="name-title">
            <DropDownList v-model="categoryId" caption="Category" :items="store.catagories.map(p => ({ id: p.id.toString(), name: p.name})) ?? []" />
            <DropDownList v-model="subCategoryId" caption="Sub Category" :items="store.catagories.find(p => p.id.toString() === categoryId)?.subCategories.map(p => ({ id: p.id.toString(), name: p.name})) ?? []" />
          </div>
        </div>
        <div class="name-title">
          <TextBox v-model="name" caption="Project Name" @input="onNameChanged" />
          <TextBox v-model="title" caption="Display Name" @input="onTitleChanged" />
        </div>
      </div>
    </template>
    <template #footer>
      <PushButton @click="show = false">Cancel</PushButton>
      <PushButton :disabled="!canCreate" @click="createProject">OK</PushButton>
    </template>
  </ModalDialog>
</template>

<style lang="css">
.create-project-content {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 32px;
  padding: 16px 8px;

  .name-title {
    display: flex;
    gap: 16px;
  }
}
</style>