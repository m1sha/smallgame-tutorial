<script setup lang="ts">
import { IContextMenu } from '../../code/context-menu'

  defineProps<{ context: IContextMenu }>()
  function oncontextmenu(e: Event) {
    e.preventDefault()
    e.stopPropagation()
  }
</script>
<template>
  <div class="context-menu-wrapper" v-if="context.show" :style="{ left: context.pos.x + 'px', top: context.pos.y + 'px'}" @contextmenu="oncontextmenu" @mouseleave="context.close()">
    <div class="context-menu">
      <div v-for="item in context.items">
        <a href="javascript:void(0)" @click="item.callback()">{{ item.caption }}</a> 
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  .context-menu-wrapper
    position: absolute

    .context-menu
      padding: 4px 8px
      border: 1px solid var(--panel-border)
      background-color: var(--panel-color)

      display: flex
      flex-direction: column
      gap: 2px

      a
        font-size: 0.8em
        color: var(--text-secondary-color)
        cursor: pointer
        &:hover
          color: var(--text-color)

</style>