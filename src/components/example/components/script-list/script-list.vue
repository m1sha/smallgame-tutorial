<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { ItemList, TDropMenu, TextBox } from 'vue3-universal-components'
import { Client, OkResult } from '../../../../api'

const props = defineProps<{ items: {id: string, name: string, category: string, codeDir: string }[], selectedId: string}>()
const emit = defineEmits<{click: [id: string]}>()
const filtredItems = computed(() => {
  if (!search.value) return props.items
  return props.items.filter(p => p.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})
const categories = computed(() => [...new Set(filtredItems.value.map(p => p.category)).keys()])
const selected = ref(props.selectedId)
const search = ref('')

watch(() => props.selectedId, () => selected.value = props.selectedId)

const itemMenu = ref<TDropMenu>({ items: [ { name: 'open',  text: 'Open in VS Code'}]})

const onMenuOpen = async (id: string, menuName) => {
  const item = filtredItems.value.find(p => p.id === id)
  if (!item) {
    console.error('Item is not foound. Id ' + id)
    return
  }

  if (menuName === 'open') {
    const response = await Client.get<OkResult>(`openInCode/?path=${item.codeDir}`)
    if (response instanceof Error) return
    if (!response.ok) {
      alert('Response in not ok')
    } 
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

</script>
<template>
  <div class="script-list-wrapper" style="">
    <div class="search-box">
    <TextBox placeholder="Search" v-model="search" search />
    </div>
    <div class="scroll-list">
      
    <template v-for="cat in categories">
      <p class="category">{{ cat }}</p>
      <ItemList 
        :items="filtredItems.filter(p => p.category === cat)" 
        :menu="itemMenu"
        v-model="selected" 
        @click="({ id }) => emit('click', id )"
        @menu-click="onMenuOpen"
        >
      </ItemList>
    </template>

    <p v-if="!filtredItems.length && search">Empty Result</p>
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
  
</style>