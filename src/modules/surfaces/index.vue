<script setup lang="ts">
import { onMounted, toRaw, ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import { App  } from "./code"

const route = useRoute()
const router = useRouter()

const container = ref<HTMLDivElement>()
const fps = ref<HTMLDivElement>()
const app = ref<App | null>(null)

onMounted(() => {
  main()
})


async function main() {
  const w = 800
  const h = 400
  const index = parseInt(route.params.id as string)
  app.value = new App(isNaN(index) || !index ? 0 : index)
  app.value.set(container.value!, fps.value!, w, h)
  app.value!.run()
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
        <a v-for="name, i in app.names" :key="i" :href="'#/surfaces/'+ i" @click="onClick(name)" :class="{ selected: name === app.current.name }">
          {{ name }}
        </a>
      </nav>
    </menu>
    <div class="fps" ref="fps"></div>
    <div ref="container"></div>
    
  </div>
</template>