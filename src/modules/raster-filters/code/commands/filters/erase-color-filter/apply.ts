import { App } from "../../../app"
import { EraseColorFilter } from "../../../filters";
import { Command } from "../../command"


export class ApplyEraseColorFilterColorCommand implements Command {
  async commit (app: App): Promise<void> {
    const filter = app.getFilter<EraseColorFilter>('EraseColorFilter')
    filter?.applyFilter()
  }

  rollback (_: App): Promise<void> {
    throw new Error("Method not implemented.");
  }
}