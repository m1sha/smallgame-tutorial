<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { PushButton, TextBox } from 'vue3-universal-components'
import ProjectList from './project-list.vue';
import { ScriptListModel } from './script-list-model.ts';
import EditScripts, { IScriptEditor } from './edit-scripts.vue';
import CreateScript, { IScriptCreator } from './create-script.vue';

const props = defineProps<{ 
  items: {id: string, name: string, category: string, subCategory: string, codeDir: string }[], 
  selectedId: string
}>()
const emit = defineEmits<{click: [id: string], close: []}>()
const editScripts = ref<IScriptEditor>()
const createScript = ref<IScriptCreator>()
const selected = ref(props.selectedId)
const search = ref('')
const viewmodel = new ScriptListModel(props.items)
const onMenuOpen = async (id: string) => {
  const response = await viewmodel.openInVsCode(id)
  if (response instanceof Error) return
  if (!response.ok) {
    alert('Response in not ok')
  } 
}

onMounted(async () => {
  await nextTick()
  
  const items = document.querySelectorAll('.list-item')
  items.forEach(item => {
    if (!item.classList.contains('selected')) return
    item.scrollIntoView({ behavior: 'instant', block: 'center' })
  })
})

watch(() => props.selectedId, () => selected.value = props.selectedId)
watch(() => search.value, () => viewmodel.search(search.value))

</script>
<template>
  <div class="script-list-wrapper">
    <div class="script-list-content">
      <div class="search-box">
        <TextBox placeholder="Search" v-model="search" search />
        <div>
          <PushButton @click="emit('close')"><i class="fa fa-close" /></PushButton>
        </div>
      </div>
      
      
      
      <div class="scroll-list">
        <div class="script-category" v-for="cat in viewmodel.categories">
          <div class="category-title">
            <p class="category">{{ cat.name }}</p>
            <a href="javascript:void(0)" @click="createScript.open(cat.name, '')" title="Create Project"><i class="fa fa-plus"></i></a>
          </div>
          <ProjectList 
            :items="cat.projects" 
            v-model="selected" 
            @click="({ id }) => emit('click', id )"
            @open-in-vs-code="onMenuOpen"
            >
          </ProjectList>

          <template v-for="sub in cat.subCategories" >
            <div class="category-title">
              <p class="sub-category">{{ sub.name }}</p>
              <a href="javascript:void(0)" @click="createScript.open(cat.name, sub.name)" title="Create Project"><i class="fa fa-plus"></i></a>
            </div>
            <div style="margin-left: 8px;">
              <ProjectList 
                :items="sub.projects" 
                v-model="selected" 
                @click="({ id }) => emit('click', id )"
                @open-in-vs-code="onMenuOpen"
              >
            </ProjectList>
            </div>
          </template>
        </div>

        <p v-if="viewmodel.isEmptySearch">Empty Result</p>
      </div>

      <div class="project-edit">
        <a href="javascript:void(0)" title="Edit Projects Sructure" @click="editScripts?.open()"><i class="fa fa-edit"></i> Edit Projects</a>
        <br />
      </div>
    </div>

    <EditScripts ref="editScripts" />
    <CreateScript ref="createScript" />
  </div>
</template>


<style lang="sass">
.script-list-wrapper
  position: absolute
  z-index: 1
  inset: 0
  padding: 8px 16px 
  background-color: rgba(55, 55, 55, 0.4941176471)
  backdrop-filter: blur(2px)
  border: 1px solid var(--panel-border)
  box-shadow: inset -16px 0px 60px #4444444e, 16px 0px 20px #3636364e
  display: flex
  justify-content: center
  align-items: center

  .script-list-content
    display: flex
    flex-direction: column
    border: 1px solid #272727
    padding: 16px
    background-color: rgba(35, 35, 35, 0.8)
    border-radius: 12px

  .script-category 
    display: flex
    flex-direction: column
    

  .search-box
    margin-bottom: 18px
    display: flex
    button.push-button 
      background-color: transparent
      border: none

  .project-edit
    margin-top: 8px
    padding-top: 8px
    a
      font-size: 12px
      color: #aaa
      padding-bottom: 1px
      border-bottom: 1px solid #999
      &:hover
        color: #bbb
      
      

  .scroll-list
    height: calc( 100vh -  198px)
    overflow-y: auto
    display: flex
    gap: 12px
    flex-wrap: wrap
    //margin-top: 8px

    .category-title
      display: flex 
      align-items: center 
      justify-content: space-between
      a 
        opacity: 0
      &:hover
        a
          opacity: 1

  p.category
    padding: 0
    //margin-top: 24px
    margin-bottom: 8px
    font-size: 16px
    color: #ccc

  p.sub-category
    padding: 0
    margin-top: 8px
    margin-bottom: 8px
    font-size: 14px
    font-weight: 300
    color: #bbb
  
</style>