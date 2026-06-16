import { Point } from "smallgame"
import { Tools } from "../tools"
import { Shapes } from "./shapes"
import { StateChangeSource } from "./types"
import { Command, CommandHistory } from "../commands"

export class EditorState {
  private commandHistory: CommandHistory = new CommandHistory(this)
  useEditor: boolean = true
  offset: Point
  readonly shapes: Shapes = new Shapes(this)
  readonly tools: Tools = new Tools(this)
   
  onStateChanged:  ((source: StateChangeSource, reason: string) => void) | null = null

  stateChanged (source: StateChangeSource, reason?: string) {
    this.onStateChanged?.(source, reason ?? '')
  }

  sendCommand (command: Command) {
    command.execute(this)
    this.commandHistory.push(command)
  }

  canUndo () { return this.commandHistory.canUndo() }
  canRedo () { return this.commandHistory.canRedo() }
  undo () { this.commandHistory.undo() }
  redo () { this.commandHistory.redo() }
}