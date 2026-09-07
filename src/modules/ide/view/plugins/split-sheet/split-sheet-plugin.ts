import { Editor, Plugin } from "../../../../modules/ide"
import { SplitSheetWorkspace, SplitSheetPanel } from './components'

export class SplitSheetPlugin extends Plugin {
  constructor (editor: Editor) {
    super()
    this.title = 'Split Sheet'
    this.workspace = SplitSheetWorkspace
    this.panels.push(SplitSheetPanel)
    //this.addContextMenuItem('Split', () => {})
  }
}