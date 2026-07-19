import { Point } from "smallgame"

export interface IHyperTextStyle {
  color?: string
  fontSize?: string
}

export class HyperText {
  constructor (private container: HTMLElement) {

  }

  createText (style: IHyperTextStyle, text: string, pos: Point) {
    const el = document.createElement('span')

    el.style.position = 'absolute'
    el.style.top = pos.y + 'px'
    el.style.left = pos.x + 'px'
    el.textContent = text

    el.style.fontSize = style ? style.fontSize: undefined
    el.style.color = style ? style.color: undefined
    
    this.container.append(el)
  }
}