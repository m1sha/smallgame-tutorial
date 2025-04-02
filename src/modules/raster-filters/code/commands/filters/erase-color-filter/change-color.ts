import { RGBA } from "smallgame/src/utils/pixels"
import { App } from "../../../app"
import { Command } from "../../command"
import { EraseColorFilter, EraseColorFilterSetting } from "../../../filters/erase-color-filter"

export class ChangeEraseColorFilterColorCommand implements Command {
  constructor (private value: RGBA) {}
  
  async commit (app: App): Promise<void> {
    const settings = app.appState.getFilterSettings<EraseColorFilterSetting>('EraseColorFilter')
    const filter = app.getFilter<EraseColorFilter>('EraseColorFilter')

    settings.color = this.value
    filter?.change(settings)
  }
  
  rollback (_: App): Promise<void> {
    throw new Error("Method not implemented.");
  }
}