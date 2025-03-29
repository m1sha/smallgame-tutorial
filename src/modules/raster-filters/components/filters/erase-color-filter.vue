<script setup lang="ts">

import app from '../../code'

const onInput = (ev: Event) => { 
  const value = parseInt((ev.target as HTMLInputElement).value)
  app.eraseColorFilter.change([255, 255, 255, 0], value) 
}

const onClick = () => app.eraseColorFilter.applyFilter()

</script>

<template>
  <div class="filter">
    <h3>Erase color</h3>

    <label>Color</label>
    <input type="color" />
    <br />

    <label>Value</label>
    <input type="range" min="0" max="10000"  value="32" style="width: 300px;" @input="onInput" />

    <br />
    <button @click="onClick">Apply</button>
  </div>
</template>