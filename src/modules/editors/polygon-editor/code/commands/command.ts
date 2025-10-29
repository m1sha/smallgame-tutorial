import type { EditorState } from "../editor-state"
import { uid } from "../utils/uid"

export abstract class Command {
  id: string = uid()
  saveInHistory = true
  useMerge = false

  merge (_: Command) {}
  
  abstract commit (state: EditorState): void
  abstract rollback (state: EditorState): void
}