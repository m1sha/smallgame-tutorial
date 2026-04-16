<script setup lang="ts">
import { IEnity, IEnityList } from '../../code'

const { entities } = defineProps<{ entities: IEnityList }>()

const display = (item: IEnity) => {
  const cls = entities.enityClasses.find( p => p.name === item.className)
  if (!cls && item.obj) {
    return item.obj.value ? item.obj.value : item.obj
  }

  if (cls && item.obj) {
    return item.obj.value ? cls.displayFormat(item.obj.value) : cls.displayFormat(item.obj)
  }

  return 'undefine value'
}

</script>
<template>
  <div class="entity-list-wrapper">
    <div v-for="item in entities.items" class="entity">
      <div v-html="display(item)"></div>
      <div>
        <button @click="entities.onRemoveEnity(item)"><i class="fa fa-trash"></i></button>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.entity-list-wrapper
  position: absolute
  z-index: 1
  top: 0
  padding: 8px 16px 
  background-color: rgba(55, 55, 55, 0.4941176471)
  backdrop-filter: blur(2px)
  border: 1px solid var(--panel-border)
  width: 8.2vw

  .entity
    display: flex
    justify-content: space-between
    align-items: center
</style>