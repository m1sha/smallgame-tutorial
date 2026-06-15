import { EditorState } from "../../editor-state";

export abstract class Command {
  abstract execute (state: EditorState): void
  abstract rollback (state: EditorState): void
}