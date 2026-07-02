<script setup lang="ts">
import { ref } from 'vue';
import { PushButton, TextBox } from 'vue3-universal-components';
const commandName = ref('')
</script>
<template>
  <div>
    <div style="background-color: #272727; height: 80vh;">

    </div>
  <div style="display: flex; align-items: end;">
    <TextBox caption="Command" v-model="commandName" />
    <div>
      <PushButton>Send</PushButton>
    </div>
    
  </div>
  </div>
</template>