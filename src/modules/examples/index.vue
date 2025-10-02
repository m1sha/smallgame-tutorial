<script setup lang="ts">
import { onMounted, toRaw, ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import { App  } from "./code"

const route = useRoute()
const router = useRouter()

const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const app = ref<App | null>(null)
const list = ref<{id: string, name: string}[]>([])

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
}

function onModeChanged (ev: Event) {
  const select = ev.target as HTMLSelectElement
  app.value?.selector.setCurrentId(select.value)
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
        <label>Mode</label>
        <select @change="onModeChanged">
          <option :value="item.id" v-for="item in list">{{ item.name }}</option>
        </select>
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
      label
        font-size: 0.8em
        color: #eee
    
  
</style>