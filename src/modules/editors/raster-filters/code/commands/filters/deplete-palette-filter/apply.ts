import { App } from "../../../app"
import { DepletePaletteFilter } from "../../../filters";
import { Command } from "../../command"

export class ApplyDepletePaletteFilterCommand implements Command {
  async commit (app: App): Promise<void> {
    const filter = app.getFilter<DepletePaletteFilter>('DepletePaletteFilter')
    filter?.applyFilter()
  }

  rollback (_: App): Promise<void> {
    throw new Error("Method not implemented.");
  }
}