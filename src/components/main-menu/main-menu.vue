<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const editorsMenu = ref<HTMLElement>()

const menuItems = [
  {
    id: 'Home',
    text: 'Home',
    path: '#/'
  }
]

</script>
<template>
  <menu class="main-menu">
    <nav>

      <template v-for="item in menuItems">
        <div class="nav-link">
          <a :href="item.path" :class="{ 'router-link-active': route.name === item.id }"><i class="nf nf-md-home"></i>{{ item.text }}</a>
          <div class="border"></div>
        </div>
        <div class="sep"></div>
      </template>

      <div class="nav-link">
        <a href="#/sandbox" :class="{ 'router-link-active': route.path.startsWith('/sandbox')  }"><i class="nf nf-md-toy_brick_outline"></i> Sandbox</a>
        <div class="border"></div>
      </div>

      <div class="sep"></div>
      <div class="nav-link">
        <a href="#/ide" :class="{ 'router-link-active': route.path.startsWith('/ide')  }"><i class="nf nf-md-application_brackets_outline"></i> IDE</a>
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
            <a href="#/editors/tile-editor" :class="{ 'router-link-active': route.name === 'TileEditor' }">Tile Editor</a>
            <div class="border"></div>
          </div>

          <div class="nav-link">
            <a href="#/editors/raster-filers" :class="{ 'router-link-active': route.name === 'RasterFilers' }">Raster Filers</a>
            <div class="border"></div>
          </div>
          
          <div class="sep"></div>
          <div class="nav-link">
            <a href="#/editors/polygon-editor" :class="{ 'router-link-active': route.name === 'PolygonEditor' }">Polygon Editor</a>
            <div class="border"></div>
          </div>

           <div class="sep"></div>
          <div class="nav-link">
            <a href="#/editors/sprite-editor" :class="{ 'router-link-active': route.name === 'SpriteEditor' }">Sprite Editor</a>
            <div class="border"></div>
          </div>
          
        </div>
      </div>


      <div class="sep"></div>
      <div class="nav-link">
        <a href="#/games" :class="{ 'router-link-active': route.path.startsWith('/games')  }"><i class="nf nf-md-gamepad_square"></i>Games</a>
        <div class="border"></div>
      </div>

      <!-- <div class="sep"></div>
      <div class="nav-link">
        <a href="#/games" :class="{ 'router-link-active': route.path.startsWith('/games')  }"><i class="nf nf-md-view_dashboard_variant"></i>Board</a>
        <div class="border"></div>
      </div> -->
      
    </nav>
  </menu>
</template>

<style lang="sass">
menu.main-menu
  position: absolute
  top: 4px
  z-index: 100
  margin: 0
  padding: 0

  opacity: 0
  &:hover
    opacity: 1
  
  
  nav
    display: flex
    gap: 12px
    box-shadow: 0 0 20px #444
    background-color: #2b2b2b
    border-radius: 8px
    .nav-link
      display: flex
      flex-direction: column
      gap: 2px
      padding: 8px
      a 
        display: flex
        align-items: center
        gap: 6px
        font-size: 14px
        color: #999
        i
          font-size: 0.95em
      &:first-child
        padding-left: 16px
      &:last-child
        padding-right: 16px

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
      border-right: 2px solid #252525
</style>