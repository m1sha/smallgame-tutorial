<script setup lang="ts">
import { PushButton, TextBox } from 'vue3-universal-components'
import { Box } from '../../../panels'
defineProps<{ boxes: Box[] }>()
const emit = defineEmits<{ click: [box: Box], updatedRect: [] }>()
</script>

<template>
   <div>
      <PushButton>Edit</PushButton>
    </div>

    <div class="boxes-list v-grid-table">
      <div class="header">
        <div class="header-column"></div>
        <div class="header-column">#</div>
        <div class="header-column">X</div>
        <div class="header-column">Y</div>
        <div class="header-column">W</div>
        <div class="header-column">H</div>
      </div>
      <div :key="box.id" v-for="box, index in boxes" class="row">
        <div class="column" @click="emit('click', box)">
          <i class="fa-solid fa-square-check" style="color: #aaa;" v-if="box.selected"></i>
          <i class="fa-regular fa-square" v-if="!box.selected"></i>
          <!-- <input type="checkbox" :checked="box.selected" @click="emit('click', box)"> -->
        </div>
        <div class="column"><div class="box-num">{{ index + 1 }}</div></div>
        <div class="column"><TextBox type="int" v-model="box.x" @update:model-value="emit('updatedRect')" /></div>
        <div class="column"><TextBox type="int" v-model="box.y" @update:model-value="emit('updatedRect')" /></div>
        <div class="column"><TextBox type="int" v-model="box.width" @update:model-value="emit('updatedRect')" /></div>
        <div class="column"><TextBox type="int" v-model="box.height" @update:model-value="emit('updatedRect')" /></div>
      </div>
    </div>
</template>