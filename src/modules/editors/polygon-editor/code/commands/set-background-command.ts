import { loadBlob } from 'smallgame'
import type { EditorState } from "../editor-state"
import { Command } from "./command"
import { ImageObject } from '../objects'

export class SetBackgroundCommand extends Command {
  private file: Blob
  private img: ImageObject | null = null

  constructor (file: Blob) {
    super()
    this.file = file
  }

  async commit (state: EditorState) {
    const surface = await loadBlob(this.file)
    this.img = state.objects.createImage(surface)
    state.emit('create', this.img)
  }

  rollback (state: EditorState): void {
    if (this.img) state.objects.remove(this.img)
  }
}
