<script setup lang="ts">
import { PushButton } from 'vue3-universal-components';
import { ScriptDef } from '../../code';

defineProps<{ script: ScriptDef }>()
const emit = defineEmits<{ menuClick: [], settingsClick: [] }>()
</script>

<template>
  <div class="project-info">
    <PushButton @click="emit('menuClick')" title="Shows Projects">
      <i class="fa fa-bars" />
    </PushButton>

    <div class="project-caption">
      <span>{{ script.category }}</span>
      <span>/</span>
      <span>{{ script.name }}</span>
    </div>

    <div class="left-block">
      <div>
        <PushButton @click="emit('settingsClick')" title="Project Settings">
          <i class="fa fa-gears" />
        </PushButton>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
    
  </div>
</template>

<style lang="css">
.project-info {
  background-color: #2c2c2c;
  display: flex;
  gap: 6px;
  align-items: center;
  padding-left: 4px;
  border-bottom: 1px solid #242424;

  button.push-button {
    background-color: transparent;
    border: none;
    padding: 2px;
  }

  .project-caption {
    display: flex;
    font-size: 14px;
    color: #888;
    gap: 4px;
    background-color: #242424;
    padding: 4px 18px;
    border-radius: 4px;
  }

  .left-block {
    margin-left: auto;
    display: flex;
    gap: 8px;
    align-items: center;
  }
}
</style>
