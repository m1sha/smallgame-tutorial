import { App } from "../../../app"
import { DepletePaletteFilter, DepletePaletteFilterSetting } from "../../../filters";
import { Command } from "../../command"


export class ChangeDepletePaletteFilterValueCommand implements Command {
  constructor (private value: number) {}

  async commit (app: App): Promise<void> {
    const settings = app.appState.getFilterSettings<DepletePaletteFilterSetting>('DepletePaletteFilter')
    const filter = app.getFilter<DepletePaletteFilter>('DepletePaletteFilter')
    settings.value = this.value
    filter?.change(settings)
  }

  rollback (_: App): Promise<void> {
    throw new Error("Method not implemented.");
  }
}