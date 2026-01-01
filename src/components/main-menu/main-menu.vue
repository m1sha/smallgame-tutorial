<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const editorsMenu = ref<HTMLElement>()
</script>
<template>
  <menu class="main-menu">
    <nav>
      <div class="nav-link">
        <a href="#/" :class="{ 'router-link-active': route.name === 'Home' }"><i class="nf nf-md-home"></i>Home</a>
        <div class="border"></div>
      </div>
      
      <div class="sep"></div>
      <div class="nav-link">
        <a href="#/sandbox" :class="{ 'router-link-active': route.path.startsWith('/sandbox')  }"><i class="nf nf-md-atom_variant"></i> Sandbox</a>
        <div class="border"></div>
      </div>
      
      <div class="sep"></div>

      <div class="sublink">
        <div class="nav-link">
          <a id="btn-menu" popovertarget="EditorsMenu" href="javascript:void(0)" @click="editorsMenu?.togglePopover()" :class="{ 'router-link-active': route.path.startsWith('/editors')  }"><i class="nf nf-md-vector_square_edit"></i> Editors</a>
          <div class="border"></div>
        </div>
        
        
        <div id="EditorsMenu" popover class="submenu" ref="editorsMenu">
          <div class="nav-link">
            <a href="#/editors/raster-filers" :class="{ 'router-link-active': route.name === 'RasterFilers' }">Raster Filers</a>
            <div class="border"></div>
          </div>
          
          <div class="sep"></div>
          <div class="nav-link">
            <a href="#/editors/polygon-editor" :class="{ 'router-link-active': route.name === 'PolygonEditor' }">Polygon Editor</a>
            <div class="border"></div>
          </div>
          
        </div>
      </div>


      <div class="sep"></div>
      <div class="nav-link">
        <a href="#/games" :class="{ 'router-link-active': route.path.startsWith('/games')  }"><i class="nf nf-md-gamepad_square"></i>Games</a>
        <div class="border"></div>
      </div>
      
    </nav>
  </menu>
</template>

<style lang="sass">
menu.main-menu
  margin: 2px
  margin-top: 4px
  nav
    display: flex
    gap: 12px
    box-shadow: 0 0 20px #444
    padding: 0px 16px

    .nav-link
      display: flex
      flex-direction: column
      gap: 2px

      a 
        display: flex
        align-items: center
        gap: 6px
        i
          font-size: 0.95em

    .sublink
      position: relative
      

      #btn-menu
        anchor-name: --btn-menu

      .submenu
        background-color:  var(--data-main-dg-color)
        width: max-content
        inset: 0
        border: 2px solid #282828
        border-top: 0
        padding: 8px
        flex-direction: column
        gap: 2px
        position: absolute
        position-anchor: --btn-menu
        top: anchor(bottom)
        left: anchor(left)
        margin-top: 0px
        margin-left: -14px

        &:popover-open
          display: flex

        a
          font-size: 0.9em
        

    button
      border: 0
      padding: 0
      margin: 0
      &:active
        transform: scale(1)

    a, button
      color: #aaa
      padding-bottom: 0.25em
      
      font-size: 1.1em
      padding: 4px 0

    

      &.router-link-active, &.selected
        color: #ccc
        & + .border
          border-bottom: 0.15em solid var(--data-ascent-color)

    .sep
      border-right: 2px solid #282828
</style>