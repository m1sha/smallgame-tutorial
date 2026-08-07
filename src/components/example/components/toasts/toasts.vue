<script setup lang="ts">
import { PushButton } from 'vue3-universal-components';
import { IToastMessage } from '../../code';

defineProps<{ messages: IToastMessage[] }>()
const emit = defineEmits<{ close: [message: IToastMessage, index: number] }>()
</script>

<template>
  <div class="toasts-wrapper">
    <div class="toast-list">
      <div class="toast" v-for="message, index in messages">
        <div>
          <PushButton @click="emit('close', message, index)"><i class="fa fa-close"></i></PushButton>
        </div>
        <p v-html="message.message"></p>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.toasts-wrapper {
  position: absolute;
  bottom: 36px;
  right: 8px;

  .toast-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 12px;

    /* overflow-y: auto;
    height: calc(100vh - 120px); */

    .toast {
      background-color: #323232;
      border: 1px solid #282828;

      
      
      color: #aaa;
      border-radius: 8px;
      min-width: 200px;

      display: flex;
      flex-direction: column;

      div {
        align-self: flex-end;
        .vue3-uui__push-button {
          padding: 4px 2px;
          font-size: 10px;
        }
      }

      p {
        padding: 8px;
        padding-top: 0;
        margin: 0;
      }
    }
  }
}
</style>