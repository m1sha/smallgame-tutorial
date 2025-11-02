<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ItemList } from 'vue3-universal-components'

const porps = defineProps<{ items: {id: string, name: string, category: string }[], selectIndex: number}>()
const emit = defineEmits<{click: [id: number]}>()
const categories = computed(() => new Set(porps.items.map(p => p.category)).keys())
const selected = ref(porps.items[porps.selectIndex].id)

watch(() => porps.selectIndex, () => selected.value = porps.items[porps.selectIndex].id)

</script>
<template>
  <div class="script-list-wrapper" style="">
    <template v-for="cat in categories">
      <p class="category">{{ cat }}</p>
      <ItemList :items="items.filter(p => p.category === cat)" v-model="selected" @click="({ id }) => emit('click', items.findIndex(p => p.id === id) )" />
    </template>
    
  </div>
</template>


<style lang="sass">
.script-list-wrapper
  position: absolute
  top: 0
  padding: 8px 16px 
  background-color: #3737377e
  height: calc( 100vh -  76px)
  width: 10vw
  overflow-y: auto

  box-shadow: inset -16px 0px 60px #4444444e, 16px 0px 20px #3636364e

  p.category
    padding: 0
    margin-top: 24px
    margin-bottom: 8px
  
</style>