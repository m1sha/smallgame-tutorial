import type { EditorState } from "../editor-state"
import { uid } from "../utils/uid"

export abstract class Command {
  id: string = uid()
  saveInHistory = true
  
  abstract commit (state: EditorState): void
  abstract rollback (state: EditorState): void
}