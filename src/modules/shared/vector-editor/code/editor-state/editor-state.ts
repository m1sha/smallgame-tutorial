import { Point } from "smallgame"
import { Tools } from "../tools"
import { Shapes } from "./shapes/shapes"
//import { Command, CommandHistory } from "../commands"

export class EditorState {
  offset: Point

  //private commandHistory: CommandHistory = new CommandHistory(this)
  readonly shapes: Shapes = new Shapes(this)
  readonly tools: Tools = new Tools(this)
   
  onStateChanged:  (() => void) | null = null
  
  get onSelectedShapes () { return this.shapes.selecteds.onSelectedShapes }
  set onSelectedShapes (value: (() => void) | null) { this.shapes.selecteds.onSelectedShapes = value }
  get onShapesChanged () { return this.shapes.onShapesChanged }
  set onShapesChanged (value: (() => void) | null) { this.shapes.onShapesChanged = value }

  stateChanged (reason?: string) {
    this.onStateChanged?.()
  }

  //sendCommand (command: Command) {
  //  command.execute(this)
  //  this.commandHistory.push(command)
  //}
}