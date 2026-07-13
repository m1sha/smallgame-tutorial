<script setup lang="ts">
type TProject = { id: string, name: string }

defineProps<{ items: TProject[] }>()
const model = defineModel<string>()
const emit = defineEmits<{ click: [item: TProject], openInVsCode: [id: string] }>()

const onClick = (item: TProject) => {
  model.value = item.id
  //emit('click', item)
}

</script>

<template>
  <div class="list">
    <div class="list-item" v-for="item in items" :class="{ selected: model === item.id }">
      <a :href="'#/sandbox/' + item.id" @click="onClick(item)">{{ item.name }}</a>
      <span @click.stop="emit('openInVsCode', item.id)" title="Open In VS Code"><i class="fa fa-arrow-up-right-from-square"></i></span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.list {
  .list-item {
    display: flex;
    padding-right: 4px;
    font-size: 12px;
    a {
      padding:4px;
    }

    span {
      opacity: 0;
      &:hover {
        cursor: pointer;
      }
    }

    &:hover {
      span {
        opacity: 1;
      }
    }
  }
}
</style>