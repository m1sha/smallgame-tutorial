import { loadBlob } from 'smallgame'
import type { EditorState } from "../editor-state"
import { Command } from "./command"

export class SetBackgroundCommand extends Command {
  private file: Blob

  constructor (file: Blob) {
    super()
    this.file = file
  }

  async commit (state: EditorState) {
    const surface = await loadBlob(this.file)
    state.background.setImage(surface)
  }

  rollback (state: EditorState): void {
    state.background.clear()
  }
}
