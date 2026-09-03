import { isWorkspace, IWorkspace, Workspace, WorkspaceConstructorOptions } from "./workspace";


export interface ISplitSheetWorkspace extends IWorkspace {
  url: string
}

export class SplitSheetWorkspace extends Workspace {
  constructor (title: string, readonly url: string, options?: WorkspaceConstructorOptions) {
    super(title, options)
  }
}

export function isSplitSheetWorkspace (workspace: any): workspace is ISplitSheetWorkspace {
  const all = isWorkspace(workspace) as unknown
  return all && typeof workspace.url === 'string'
}