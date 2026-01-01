import { TPoint } from "smallgame"

export interface IContextMenuItem {
  icon?: string
  caption: string
  callback: () => void
}

export interface IContextMenu {
  show: boolean
  pos: TPoint
  items: IContextMenuItem[]
  close: () => void
}