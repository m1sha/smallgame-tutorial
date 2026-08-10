import { defineStore } from "pinia"
import { IScriptCategory } from "../code/script-category"
import { IScriptListItem } from "../code/script-list-item"
import { computed, ref } from "vue"

const useScriptsStore = defineStore('ScriptsStore', () => {
  const origonalItems = ref<IScriptListItem[]>([])
  const editedItems = ref<IScriptListItem[]>([])
  const deletedItemIds = ref<number[]>([])
  const catagories = ref<IScriptCategory[]>([])

  function set (it: IScriptListItem[], cat: IScriptCategory[]) {
    origonalItems.value = it
    catagories.value = cat
  }

  function replaceItem (newIndex: number, oldIndex: number) {
    const _items = [...origonalItems.value]
    const [movedItem] = _items.splice(oldIndex, 1)
    _items.splice(newIndex, 0, movedItem)
    origonalItems.value = _items 
  }

  function replaceCategory (newIndex: number, oldIndex: number) {
    const _items = [...catagories.value]
    const [movedItem] = _items.splice(oldIndex, 1)
    _items.splice(newIndex, 0, movedItem)
    catagories.value = _items 
  }

  function addEditItem (item: IScriptListItem) {
    editedItems.value.push(item)
  }

  function addDeleteItemId (id: number) {
    deletedItemIds.value.push(id)
  }

  const items = computed(() => {
    return origonalItems.value.filter(p => !deletedItemIds.value.includes(p.id))
  })

  async function saveData (): Promise<void | Error> {
    
  }

  return { 
    set,
    replaceItem,
    replaceCategory,
    addEditItem,
    addDeleteItemId,
    saveData,
    items,
    catagories
  }
})

export { useScriptsStore }