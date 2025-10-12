<script setup lang="ts">
import { onMounted, toRaw, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import { DropDownList } from 'vue3-universal-components'
import { App  } from "./code"

const route = useRoute()
const router = useRouter()

const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const app = ref<App | null>(null)
const list = ref<{id: string, name: string}[]>([])
const selectedItem = ref('')

onMounted(() => {
  main()
})

async function main() {
  const w = 1400
  const h = 880
  const index = parseInt(route.params.id as string)
  app.value = new App(isNaN(index) || !index ? 0 : index)
  app.value.set(container.value!, fps.value!, w, h)
  app.value!.run()
  list.value = app.value.selector.items
  selectedItem.value = list.value[0] ? list.value[0].id : ''
}

watch(() => selectedItem.value, () => onModeChanged())

function onModeChanged () {
  app.value?.selector.setCurrentId(selectedItem.value)
}

function onClick (name: string) {
  if (app.value) { toRaw(app.value).change(name) }
}

router.afterEach(() => { main() })

</script>
<template>
  <div class="gl-surface page">
    <menu class="secondary-menu" v-if="app">
      <nav>
        <a v-for="name, i in app.names" :key="i" :href="'#/examples/'+ i" @click="onClick(name)" :class="{ selected: name === app.current.name }">
          {{ name }}
        </a>
      </nav>
    </menu>

    <div class="fps" ref="fps"></div>
    <div class="content">

    <div ref="container"></div>

    <div class="controls">
      <div class="control" v-if="list.length > 0">
        
        <DropDownList v-model="selectedItem" :items="list"  caption="Mode" />
          <!-- <option :value="item.id" v-for="item in list">{{ item.name }}</option>
        </select> -->
      </div>
      
    </div>
    </div>
    
    
  </div>
</template>

<style lang="sass" scoped>
.content 
  display: flex
  .controls
    margin-top: 80px
    margin-left: 8px
    .control
      display: flex
      gap: 4px
      width: 180px
      label
        font-size: 0.8em
        color: #eee
    
  
</style>