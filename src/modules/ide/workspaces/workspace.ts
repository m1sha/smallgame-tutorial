import { Point, Size, TPoint, TSize } from "smallgame"
import { uuidv4 } from "../../../utils"

export interface IWorkspace {
  id: string
  title: string
  position: TPoint
  size: TSize
}

export type WorkspaceConstructorOptions = { position?: TPoint, size?: TSize }

export class Workspace implements IWorkspace {
  readonly id = uuidv4()
  title: string = 'Workspace'
  position: TPoint = Point.zero
  size: TSize = Size.zero

  constructor (title: string, options?: WorkspaceConstructorOptions) {
    this.title = title
    this.position = options && options.position ? options.position : Point.zero
    this.size = options && options.size ? options.size : new Size(400, 400)
  }
}

export function isWorkspace (workspace: any): workspace is IWorkspace {
  return workspace && typeof workspace.title === 'string' && workspace.position && workspace.size
}