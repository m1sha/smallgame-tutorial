import { defineStore } from "pinia"
import { IScriptCategory } from "../code/script-category"
import { IScriptListItem } from "../code/script-list-item"
import { ref } from "vue"

const useScriptsStore = defineStore('ScriptsStore', () => {
  const items = ref<IScriptListItem[]>([])
  const catagories = ref<IScriptCategory[]>([])

  function set (it: IScriptListItem[], cat: IScriptCategory[]) {
    items.value = it
    catagories.value = cat
  }

  return { 
    set,
    items,
    catagories
  }
})

export { useScriptsStore }