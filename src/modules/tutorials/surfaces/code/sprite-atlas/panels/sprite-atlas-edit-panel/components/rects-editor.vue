<script setup lang="ts">
import { PushButton, TextBox } from 'vue3-universal-components'
defineProps<{ boxes: any[] }>()
</script>

<template>
   <div>
      <PushButton>Edit</PushButton>
    </div>

    <div class="boxes-list v-grid-table">
      <div class="header">
        <div class="header-column">#</div>
        <div class="header-column">X</div>
        <div class="header-column">Y</div>
        <div class="header-column">W</div>
        <div class="header-column">H</div>
      </div>
      <div v-for="box, index in boxes" class="row">
        <div class="column"><div class="box-num">{{ index + 1 }}</div></div>
        <div class="column"><TextBox v-model="box.x" /></div>
        <div class="column"><TextBox v-model="box.y" /></div>
        <div class="column"><TextBox v-model="box.width" /></div>
        <div class="column"><TextBox v-model="box.height" /></div>
      </div>
    </div>
</template>