import { AssetCollection } from "./assets"
import { Viewport } from "./viewport"
import { Workspaces } from "./workspaces"

export class Editor {
  readonly viewport: Viewport = new Viewport()
  readonly workspaces: Workspaces = new Workspaces()
  readonly assets: AssetCollection = new AssetCollection()
}