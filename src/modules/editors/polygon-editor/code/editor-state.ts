import { Grid } from "./grid"
import { BaseObject } from "./objects"
import type { Command } from "./commands/command"
import { CommandHistory } from "./commands/command-history"
import { Objects } from "./objects/objects"

export type TActionTypes = 'created' | 'edited' | 'deleted' | 'selected'
export type TEmitEvetTyps = 'create' | 'edit' | 'delete' | 'select'

export class EditorState {
  #commandHistory: CommandHistory
  readonly grid: Grid
  readonly width: number
  readonly height: number
  //readonly polygons: Polygons
  readonly objects: Objects
  readonly selectedObject: BaseObject | null = null
  onObjectChanged: ((action: TActionTypes, obj: BaseObject) => void) | null = null
  onObjectedSelected: ((obj: BaseObject | null) => void) | null = null

  constructor (width: number, height: number) {
    this.#commandHistory = new CommandHistory(this)
    this.width = width
    this.height = height
    
    this.objects = new Objects({ width, height })
    
    //this.polygons = new Polygons()
    this.grid = new Grid(width, height)
    this.grid.visible = false
  }

  sendCommand (command: Command) {
    this.#commandHistory.add(command)
  }

  emit (action: TEmitEvetTyps, obj: BaseObject | null) {
    switch (action) {
      case 'select':
        this.onObjectChanged?.('selected', obj!)
        this.onObjectedSelected?.(obj)
        break
      case 'edit':
        this.onObjectChanged?.('edited', obj!)
        this.onObjectedSelected?.(obj)
        break
      case 'create':
        this.onObjectChanged?.('created', obj!)
        this.onObjectedSelected?.(obj)
        break
      case 'delete':
        this.onObjectChanged?.('created', obj!)
        this.onObjectedSelected?.(null)
        break
    }
  }

  undo () { this.#commandHistory.undo() }
  
  redo () { this.#commandHistory.redo() }

  
}
