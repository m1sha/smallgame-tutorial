<script setup lang="ts">
import { useRoute } from 'vue-router'
</script>

<template>
  <div class="page-not-found">
    <div>
      
      <p>404</p>
      <span>The page <span class="route">{{ useRoute().path }}</span>  is not found <span class="icon nf nf-md-emoticon_confused_outline"></span></span>
    </div>
  </div>
</template>

<style lang="sass">
  .page-not-found
    display: flex
    width: 100%
    height: calc( 100vh -  50px)
    justify-content: center
    align-items: center
    background-color: #252525
    & > div
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      padding: 4em 8em
      background-color: var(--panel-color)
      border: 1px solid var(--panel-border)
      color: var(--text-secondary-color)
      border-radius: .6em
      .icon
        font-size: 1.4em
      & > p
        font-size: 14em
        font-weight: 600
        margin: 0
      & > span
        font-size: 1.6em
        font-weight: 600
        .route
          color: var(--text-color)
</style>