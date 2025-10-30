import { defineStore } from 'pinia'
import { AppState } from '../code/app-state'
import { ref } from 'vue'
import { App } from '../code'
import { Command } from '../code/commands'

const useEditorStore = defineStore('editor-store', () => {
  const appState = ref(new AppState())
  const app = new App(appState.value)

  async function createApp (container: HTMLElement, fpsDiv: HTMLDivElement) {
    await app.create(container, fpsDiv)
  }

  async function sendCommand (command: Command) {
    await command.commit(app)
  }

  return {
    appState,
    createApp,
    sendCommand
  }
})

export { useEditorStore }