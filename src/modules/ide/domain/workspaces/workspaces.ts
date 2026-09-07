import { Workspace, WorkspaceConstructorOptions } from "./workspace"
import { SplitSheetWorkspace } from "./split-sheet-workspace"

export class Workspaces {
  items: Workspace[] = []
  selected: Workspace[] = []

  create (title: string, options?: WorkspaceConstructorOptions) {
    const workspace = new Workspace(title, options)
    this.items.push(workspace)
    return workspace
  }

  createSplitSheet (title: string, url: string, options?: WorkspaceConstructorOptions) {
    const workspace = new SplitSheetWorkspace(title, url, options)
    this.items.push(workspace)
  }

  addSelected (workspace: Workspace) {
    this.selected =[]
    this.selected.push(workspace)
  }

  isSelected (workspace: Workspace) {
    return this.selected.some(p => p.id === workspace.id)
  }
}