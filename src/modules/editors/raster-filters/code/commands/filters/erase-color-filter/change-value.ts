import { App } from "../../../app"
import { EraseColorFilter, EraseColorFilterSetting } from "../../../filters/erase-color-filter"
import { Command } from "../../command"

export class ChangeEraseColorFilterValueCommand implements Command {
  constructor (private value: number) {}

  async commit (app: App): Promise<void> {
    const settings = app.appState.getFilterSettings<EraseColorFilterSetting>('EraseColorFilter')
    const filter = app.getFilter<EraseColorFilter>('EraseColorFilter')
    
    settings.value = this.value
    filter?.change(settings)
  }
  
  rollback (_: App): Promise<void> {
    throw new Error("Method not implemented.");
  }
}