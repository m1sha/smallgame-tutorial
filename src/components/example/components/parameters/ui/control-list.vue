<script setup lang="ts">
import { ColorPicker, DropDownList, PushButton, Tracker, UploadButton } from 'vue3-universal-components'
import { Button, IControl } from '../../../code/ui/controls'
import Group from './group.vue'
import Toolbar from './toolbar.vue'

defineProps<{ controls: IControl[], isToolbar: boolean }>()

function cast<T>(a: any) { return a as T }

function isSelected (control: any)  {
 return control.selected
}

</script>

<template>
  <div class="control-list">
    <template v-for="control in controls">
      
      <!--@vue-ignore-->
      <Group v-if="control.type === 'group'" :group="control" />
      <!--@vue-ignore-->
      <Toolbar v-if="control.type === 'toolbar'" :toolbar="control" />


      <!-- <DropDownList v-if="control.type === 'select'" v-model="control.defaultValue" :items="getItems(control.items)" :caption="control.caption" @update:model-value="value => control.callback(value ?? '')" /> -->
      <!--@vue-ignore-->
      
      <PushButton v-if="control.type === 'button'" @click="control.callback(control)" :class="{ selected: isSelected(control) }" :title="control.caption" >
        <template v-if="!isToolbar">{{ cast<Button>(control).caption }}</template> 
        <i v-if="isToolbar" :class="'fa fa-' + cast<Button>(control).options!.icon"></i>
      </PushButton>
      <!-- <ColorPicker v-if="control.type === 'color'" v-model="control.defaultColor" :caption="control.caption" @update:model-value="value => control.callback(value ?? '')" /> -->

      <!--@vue-ignore-->
      <Tracker v-if="control.type === 'tracker'" v-model="control.defaultValue" :caption="control.caption" :min="control.min" :max="control.max" :step="control.step" @update:model-value="value => control.callback(value ?? 0)" />

        
      
      <div v-if="control.type === 'upload'">
        <!--@vue-ignore-->
      <UploadButton  @change="file => control.callback(file, control)" :title="control.caption">
        <template v-if="!isToolbar">{{ cast<Button>(control).caption }}</template>
        <i v-if="isToolbar" :class="'fa fa-' + cast<Button>(control).options!.icon"></i>
      </UploadButton> 
      </div>
        
      
    </template>
  </div>
  
</template>

<style lang="sass">
.control-list
  display: flex
  flex-direction: column
  gap: 8px

  & > button
    margin: 0

    &.selected
      background-color: var(--data-accident-color)
      &:hover
        background-color: var(--data-accident-color)
</style>