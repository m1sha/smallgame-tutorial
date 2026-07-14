<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { TextBox } from 'vue3-universal-components'
import ProjectList from './project-list.vue';
import { ScriptListModel } from './script-list-model.ts';

const props = defineProps<{ 
  items: {id: string, name: string, category: string, subCategory: string, codeDir: string }[], 
  selectedId: string
}>()
const emit = defineEmits<{click: [id: string]}>()
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
  <div class="script-list-wrapper" style="">
    <div class="search-box">
    <TextBox placeholder="Search" v-model="search" search />
    </div>
    <div class="scroll-list">
      
    <template v-for="cat in viewmodel.categories">
      <p class="category">{{ cat.name }}</p>

      

      <ProjectList 
        :items="cat.projects" 
        
        v-model="selected" 
        @click="({ id }) => emit('click', id )"
        @open-in-vs-code="onMenuOpen"
        >
      </ProjectList>

      <template v-for="sub in cat.subCategories" >
        <p class="sub-category">{{ sub.name }}</p>
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
    </template>

    <p v-if="viewmodel.isEmptySearch">Empty Result</p>
    </div>
    
  </div>
</template>


<style lang="sass">
.script-list-wrapper
  position: absolute
  z-index: 1
  top: 0
  padding: 8px 16px 
  background-color: rgba(55, 55, 55, 0.4941176471)
  backdrop-filter: blur(2px)
  border: 1px solid var(--panel-border)
  width: 10vw
  box-shadow: inset -16px 0px 60px #4444444e, 16px 0px 20px #3636364e

  .search-box
    margin-bottom: 18px


  .scroll-list
    
    height: calc( 100vh -  168px)
    overflow-y: auto

  p.category
    padding: 0
    margin-top: 24px
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