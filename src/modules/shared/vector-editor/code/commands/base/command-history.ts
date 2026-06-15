import { EditorState } from "../../editor-state";
import { Command } from "./command";

export class CommandHistory {
  private commands: Command[] = []
  private heap = -1

  constructor (private state: EditorState) {

  }

  push (command: Command) {
    while (this.heap > this.commands.length - 1 && this.commands.pop());
    this.commands.push(command)
    this.heap++
  }

  canUndo () {
    return this.commands.length > 0 && this.heap >= 0
  }

  canRedo () {
    return this.commands.length > 0 && this.heap < this.commands.length - 1
  }

  undo () {
    this.commands[this.heap].rollback(this.state)
    if (this.heap > -1) this.heap--
  }

  redo () {
    if (this.heap >= this.commands.length -1) return
    this.heap++
    this.commands[this.heap].execute(this.state)
  }
}