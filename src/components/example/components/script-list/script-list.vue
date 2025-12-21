<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ItemList, TextBox } from 'vue3-universal-components'

const porps = defineProps<{ items: {id: string, name: string, category: string }[], selectIndex: number}>()
const emit = defineEmits<{click: [id: number]}>()
const filtredItems = computed(() => {
  if (!search.value) return porps.items
  return porps.items.filter(p => p.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})
const categories = computed(() => new Set(filtredItems.value.map(p => p.category)).keys())
const selected = ref(porps.items[porps.selectIndex].id)
const search = ref('')

watch(() => porps.selectIndex, () => selected.value = porps.items[porps.selectIndex].id)

</script>
<template>
  <div class="script-list-wrapper" style="">
    <div class="search-box">
    <TextBox placeholder="Search" v-model="search" search />
    </div>
    <div class="scroll-list">
      
    <template v-for="cat in categories">
      <p class="category">{{ cat }}</p>
      <ItemList :items="filtredItems.filter(p => p.category === cat)" v-model="selected" @click="({ id }) => emit('click', items.findIndex(p => p.id === id) )" />
    </template>

    <p v-if="!filtredItems.length && search">Empty Result</p>
    </div>
    
  </div>
</template>


<style lang="sass">
.script-list-wrapper
  position: absolute
  top: 0
  padding: 8px 16px 
  background-color: #3737377e
  width: 10vw
  box-shadow: inset -16px 0px 60px #4444444e, 16px 0px 20px #3636364e

  .search-box
    margin-bottom: 18px


  .scroll-list
    
    height: calc( 100vh -  150px)
    overflow-y: auto

  p.category
    padding: 0
    margin-top: 24px
    margin-bottom: 8px
  
</style>