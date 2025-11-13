<script setup lang="ts">
import { ColorPicker, DropDownList, PushButton, Tracker } from 'vue3-universal-components'
import { AnyParameter, TOption } from '../../code'

defineProps<{ parameters: AnyParameter[] }>()

function getItems (items: string[] | TOption[]): TOption[] {
  if (!items || !items.length) return []

  if (typeof items[0] === 'string') {
    return (items as string[]).map(p => ({ id: p, name: p }))
  }

  return items as TOption[]
}

</script>

<template>
  <div class="parameter-list-wrapper" v-if="parameters.length">
    <div class="parameter-list">
      <div v-for="parameter in parameters">
        <DropDownList v-if="parameter.type === 'select'" v-model="parameter.defaultValue" :items="getItems(parameter.items)" :caption="parameter.caption" @update:model-value="value => parameter.callback(value ?? '')" />
        <PushButton v-if="parameter.type === 'button'" @click="parameter.callback(parameter)">{{ parameter.caption }}</PushButton>
        <ColorPicker v-if="parameter.type === 'color'" v-model="parameter.defaultColor" :caption="parameter.caption" @update:model-value="value => parameter.callback(value ?? '')" />
        <Tracker v-if="parameter.type === 'tracker'" v-model="parameter.defaultValue" :caption="parameter.caption" :min="parameter.min" :max="parameter.max" :step="parameter.step" @update:model-value="value => parameter.callback(value ?? 0)" />
      </div>

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
    margin-top: 80px
    display: flex
    flex-direction: column
    gap: 12px

  button
    width: 100%
  
</style>