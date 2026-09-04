<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { useEditorStore } from '../store';

const store = useEditorStore()

function scrollHorizontally(event: WheelEvent) {
  const viewer = event.currentTarget as HTMLElement;
  viewer.scrollLeft += event.deltaY;
}

onMounted(() => {
  store.editor.assets.addSprite('Terrain_(16x16).png', '/platformer/Terrain_(16x16).png')
  store.editor.assets.addSprite('tileset.png', '/platformer/tileset.png')
  store.editor.assets.addSprite('beaver_idle.png', '/platformer/characters/beaver/beaver_idle.png')
  store.editor.assets.addSprite('beaver_walk_run_jump.png', '/platformer/characters/beaver/beaver_walk_run_jump.png')
  store.editor.assets.addSprite('green-mountains_612x384_61K.jpg', '/img/green-mountains_612x384_61K.jpg')
})


async function onDragStart (event: DragEvent, asset: any) {
  //const element = event.target as HTMLElement
  //const clone = element.cloneNode(true);
  //const div = document.createElement('div')
  //div.appendChild(clone)
  //div.style.opacity = '1';
  //div.style.position = 'absolute';
  //div.style.top = '-9999px';
  //div.style.backgroundColor = '#000'
  //div.style.padding = '8px'
  //div.style.borderRadius = '12px'
  //div.style.border = '4px solid green'
  //document.body.appendChild(div)
  //event.dataTransfer?.setDragImage(div, 1, 1)
  event.dataTransfer?.setData('assetImg', asset.img)
  await nextTick()
 // div.remove()
}

</script>

<template>
  <div class="asset-explorer">
    <div class="explorer">
      <ul>
        <li>Sprites</li>
        <li>Animations</li>
        <li>Game Objects</li>
      </ul>
    </div>
    <div class="viewer" @wheel.stop.prevent="scrollHorizontally" @pointerdown.stop>
      
      <div class="card" :draggable="true" v-for="asset in store.editor.assets.items" @dragstart="onDragStart($event, asset)">
        <div class="preview">
          
          <img :src="asset.preview" height="100%" width="100%" />
        </div>
        <div class="footer">
          <div class="caption">
            <span>{{ asset.name }}</span>
          </div>
        </div>
      </div>
      

    </div>
  </div>
</template>

<style lang="css">
.asset-explorer {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);

  height: 16vh;
  width: 70vw;
  background-color: #444;

  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 4px;

  .explorer {
    width: 20%;
    background-color: #333;
  }

  .viewer {
    flex: 1;
    min-width: 0;
    background-color: #333;
    padding: 4px;
    display: flex;
    gap: 8px;
    overflow-x: auto;

    .card {
      flex: 0 0 240px;
      height: 100%;
      background-color: #222;
      box-sizing: border-box;
      position: relative;
      border-radius: 8px;
      padding: 4px;

      .preview {
        width: 100%;
        height: 100%;
        overflow: hidden;
    
        --local-even-color: #2e2e2e;
        --local-odd-color: #262626;
        --local-cell-size: 8px;
        background:
          conic-gradient(var(--local-even-color) 25%, var(--local-odd-color) 0 50%, var(--local-even-color) 0 75%, var(--local-odd-color) 0)
          0 0 / calc(var(--local-cell-size) * 2) calc(var(--local-cell-size) * 2);

        img {
    
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .footer {
        position: absolute;
        bottom: 0;
        width: calc(100% - 8px);
        background-color: #22222290;
        box-sizing: content-box;
        color: #ccc;
        padding: 2px;
        span {
          font-size: 12px;
        }
      }
    }
  
  }

  
}
</style>