<script setup lang="ts">
import { IWorkspace } from '../../../modules/ide'
import { isSplitSheetWorkspace } from '../../../modules/ide/workspaces/split-sheet-workspace';
import SplitSheetWorkspace from './split-sheet-workspace.vue';

defineProps<{ workspace: IWorkspace }>()

</script>


<template>
  <div 
    
    @dragstart.stop 
    class="workspace" 
    :style="{ 
      top: workspace.position.y + 'px', 
      left: workspace.position.x + 'px',
      minWidth: workspace.size.width + 'px',
      minHeight: workspace.size.height + 'px',
    }">
    <div class="header">
      <span>
        {{ workspace.title }}
      </span>
      <div class="menu-trigger-button" role="button">
        <i class="fa fa-chevron-down"></i>
      </div>
    </div>

    <div class="content">
      <SplitSheetWorkspace v-if="isSplitSheetWorkspace(workspace)" :workspace />
    </div>
  </div>
</template>

<style lang="css">
.workspace {
  position: absolute;
  left: 100px;
  top: 100px;
  --r: 4px;
  

  display: flex;
  flex-direction: column;


  padding: 4px;
  .header {
   
    border: 1px solid #242424;
    border-radius: var(--r) var(--r) 0 0;
    background-color: #242424;
    color: #bbb;
    width: fit-content;

    display: flex;
    gap: 8px;

    span {
       padding: 4px 8px;
      font-size: 16px;
      font-weight: 300;
    }

    .menu-trigger-button {
      display: inline-block;
      padding: 4px 8px;
      background-color: #2b2b2b;
      color: #999;
      border-radius: 0 0 0 var(--r);
      &:hover {
        background-color: #2e2e2e;
        color: #bbb;
      }
    }
  }
  .content {
    background-color: #242424;
    border: 1px solid #242424;
    flex: 1;
    position: relative;
    border-radius: 0 var(--r) var(--r) var(--r);
  }
}
</style>