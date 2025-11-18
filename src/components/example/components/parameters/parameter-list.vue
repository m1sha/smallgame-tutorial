<script setup lang="ts">
import { ColorPicker, DropDownList, PushButton, Tracker, UploadButton } from 'vue3-universal-components'
import { AnyParameter, TOption } from '../../code'
import { IUI } from '../../code/ui';
import UI from './ui/ui.vue';

const props = defineProps<{ parameters: AnyParameter[], ui: IUI }>()

function getItems (items: string[] | TOption[]): TOption[] {
  if (!items || !items.length) return []

  if (typeof items[0] === 'string') {
    return (items as string[]).map(p => ({ id: p, name: p }))
  }

  return items as TOption[]
}

const getGroup = (parameters: AnyParameter[]): string[] => {
  return [...new Set(parameters.filter(p => Boolean(p.group)).map(p => p.group))]
}

</script>

<template>
  <div class="parameter-list-wrapper">
    <UI :ui="ui" v-if="ui.controls.length > 0" />
    <div class="parameter-list" v-if="parameters.length">
      
      <template v-for="parameter in parameters">
        <DropDownList v-if="parameter.type === 'select' && !parameter.group" v-model="parameter.defaultValue" :items="getItems(parameter.items)" :caption="parameter.caption" @update:model-value="value => parameter.callback(value ?? '')" />
        <PushButton v-if="parameter.type === 'button' && !parameter.group" @click="parameter.callback(parameter)">{{ parameter.caption }}</PushButton>
        <ColorPicker v-if="parameter.type === 'color' && !parameter.group" v-model="parameter.defaultColor" :caption="parameter.caption" @update:model-value="value => parameter.callback(value ?? '')" />
        <Tracker v-if="parameter.type === 'tracker' && !parameter.group" v-model="parameter.defaultValue" :caption="parameter.caption" :min="parameter.min" :max="parameter.max" :step="parameter.step" @update:model-value="value => parameter.callback(value ?? 0)" />
        <UploadButton v-if="parameter.type === 'upload-file' && !parameter.group" @change="file => parameter.callback(file, parameter)">{{ parameter.caption }}</UploadButton>
      </template>

      <details v-for="group in getGroup(parameters)">
        <summary>{{ group }}</summary>
        <template v-for="parameter in parameters.filter(p => p.group === group)">
          <DropDownList v-if="parameter.type === 'select'" v-model="parameter.defaultValue" :items="getItems(parameter.items)" :caption="parameter.caption" @update:model-value="value => parameter.callback(value ?? '')" />
          <PushButton v-if="parameter.type === 'button'" @click="parameter.callback(parameter)">{{ parameter.caption }}</PushButton>
          <ColorPicker v-if="parameter.type === 'color'" v-model="parameter.defaultColor" :caption="parameter.caption" @update:model-value="value => parameter.callback(value ?? '')" />
          <Tracker v-if="parameter.type === 'tracker'" v-model="parameter.defaultValue" :caption="parameter.caption" :min="parameter.min" :max="parameter.max" :step="parameter.step" @update:model-value="value => parameter.callback(value ?? 0)" />
        </template>

      </details>

    </div>
    <!-- <PushButton>Apply</PushButton> -->
  </div>
</template>

<style lang="sass">
.parameter-list-wrapper
  position: absolute
  right: 0
  padding: 8px 16px 
  background-color: #3737377e
  height: calc( 100vh -  76px)
  width: 10vw

  box-shadow: inset 16px 0px 60px #4444444e, -16px 0px 20px #3636364e
  .parameter-list
    
    padding-right: 12px
    display: flex
    flex-direction: column
    gap: 12px
    overflow-y: auto
    overflow-x: hidden
    height: calc(100% - 8vh)
    

    details
      border: 1px solid var(--panel-border)
      display: flex
      flex-direction: column
      color: var(--text-color)
      padding: 0.5em 0.5em 0
      border-radius: 4px
    
    summary 
      font-weight: bold
      margin: -0.5em -0.5em 0
      padding: 0.5em
      font-size: 0.8em
      cursor: pointer

      &:hover
        background-color: var(--panel-color)

    details[open] 
      padding: 0.5em


    details[open] summary 
      border-bottom: 1px solid var(--panel-border)
      margin-bottom: 0.5em


    

    button
      margin-top: 8px
      width: 100%
  
</style>