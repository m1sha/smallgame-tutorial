<script setup lang="ts">
import { ref } from 'vue';
import { DropDownList, ModalDialog, PushButton, TextBox } from 'vue3-universal-components'
import { AnyModal, ModalTypes } from '../../code/modal'


const show = ref(false)
const modalType = ref<ModalTypes>('info')
const modalDef = ref<AnyModal | null>(null)
const value = ref('')
const options = ref<{id: string, name: string}[]>([])
const result = ref('')
const emit = defineEmits<{ close: [result: string] }>()


export interface CommonModalComponent {
  open (def: AnyModal): void
  //close (): string
}
defineExpose<CommonModalComponent>({
  open: (def: AnyModal) => {
    modalDef.value = def

    if (def.type === 'prompt' || def.type === 'multichoose') {
      value.value = def.defaultValue ? def.defaultValue : ''
    }

    if (def.type === 'multichoose') {
      options.value = def.options.map(p => ({ id: p, name: p }))
    }
    
    show.value = true 
  }
})

const onClose = (button: 'ok' | 'cancel') => {
  emit('close', button === 'ok' ? value.value : '')
  show.value = false 
}

</script>

<template>
  <ModalDialog v-if="modalDef" :show :title="modalDef.title" @closed="onClose('cancel')">
    <template #body>
      <div class="common-modal-content" >
        <TextBox v-model="value" :caption="modalDef.message" v-if="modalDef.type === 'prompt'" />
        <DropDownList v-model="value" :items="options" :caption="modalDef.message" v-if="modalDef.type === 'multichoose'" />
      </div>
    </template>
    <template #footer>
      
      <PushButton class="cancel" @click="onClose('cancel')">Cancel</PushButton>
      <PushButton @click="onClose('ok')">OK</PushButton>
    </template>
  </ModalDialog>
</template>

<style lang="css">
.common-modal-content {
  padding:  16px 8px;
  min-height: 40px;
}
</style>