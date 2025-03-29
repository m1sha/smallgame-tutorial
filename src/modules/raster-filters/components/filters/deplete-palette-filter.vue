<script setup lang="ts">
import app from '../../code'
const onInput = (ev: Event) => { 
  const value = parseInt((ev.target as HTMLInputElement).value)
  app.depletePaletteFilter.change(value) 
}

const onClick = () => app.eraseColorFilter.applyFilter()

</script>

<template>
  <div class="filter">
    <h3>Deplete Palette</h3>

    <label>Value</label>
    <input type="range" min="1" max="256"  value="32" style="width: 300px;" @input="onInput" />

    <br />
    <div ref="pal" style="display: flex; flex-wrap: wrap; gap: 4px;"></div>
    <br />
    <button @click="onClick">Apply</button>
  </div>
</template>