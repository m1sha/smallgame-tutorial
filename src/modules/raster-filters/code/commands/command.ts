import { App } from "../app"

export interface Command {
  commit (app: App): Promise<void>
  rollback (app: App): Promise<void>
}