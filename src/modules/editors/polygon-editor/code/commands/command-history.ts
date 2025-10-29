
import type { EditorState } from '../editor-state'
import { Command } from './command'


export class CommandHistory {
  #commands: Command[] = []
  #heap: number = 0
  #state: EditorState

  constructor (state: EditorState) {
    this.#state = state
  }

  has (command: Command): boolean {
    return this.#commands.some(p => p.id === command.id)
  }

  add (command: Command): boolean {
    if ( this.#commands.length) {
      const prevCommand = this.#commands[this.#commands.length-1]
      if (prevCommand.constructor.name === command.constructor.name && prevCommand.useMerge) {
        prevCommand.merge(command)
        return false
      }
    }

    command.commit(this.#state)
    //console.log("%s inHistory: %s", command.constructor.name, command.saveInHistory)
    if (!command.saveInHistory) return false
    //console.log(command.constructor.name)

    if (this.#heap < this.commandCount) {
      while (this.#heap < this.commandCount) {
        this.#commands.pop()
      }
    }
    
    this.#commands.push(command)
    this.#heap = this.commandCount
    return true
  }

  undo () {
    if (this.#heap <= 0) return
    const command = this.command
    command.rollback(this.#state)
    this.#heap--
  }

  redo () {
    if (this.#heap + 1 > this.commandCount) return
    this.#heap++
    const command = this.command
    command.commit(this.#state)
  }

  get command () {
    return this.#commands[this.#heap - 1]
  }

  get commandCount () {
    return this.#commands.length
  }

  get commands () {
    return this.#commands.filter((_, index) => index < this.#heap).map(p => p.constructor.name)
  }
}
