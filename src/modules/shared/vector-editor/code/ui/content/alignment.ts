
import { EditorState } from "../../editor-state";
import { IContent } from "./content";
import { Group } from "../../../../../../components/example/code/ui/controls"
import { Shape } from "../../editor-state/shapes";

export class Alignment implements IContent {

  constructor (private panel: Group, private state: EditorState) { 
    panel.expand()
    panel.toolbar(tb => {
      tb.button('Vertical Top', () => { this.align('vertical-top') }, { icon: ' material-symbols-outlined align_vertical_top'})
      tb.button('Vertical Center', () => { this.align('vertical-center') }, { icon: ' material-symbols-outlined align_vertical_center'})
      tb.button('Vertical Bottom', () => { this.align('vertical-bottom')}, { icon: ' material-symbols-outlined align_vertical_bottom'})
    })
    panel.toolbar(tb => {
      tb.button('Horizontal Left', () => { this.align('horizontal-left')}, { icon: ' material-symbols-outlined align_horizontal_left'})
      tb.button('Horizontal Center', () => { this.align('horizontal-center')}, { icon: ' material-symbols-outlined align_horizontal_center'})
      tb.button('Horizontal Right', () => { this.align('horizontal-right')}, { icon: ' material-symbols-outlined align_horizontal_right'})
    })
  }

  update () {
    this.state.shapes.selecteds.count > 1 && this.state.tools.currentName === 'move-shapes'
    ? this.panel.show() 
    : this.panel.hide()
  }

  setVisible (value: boolean) {
    value ? this.panel.show() : this.panel.hide()
  }

  private align (side: 'vertical-top' | 'vertical-center' | 'vertical-bottom' | 'horizontal-left' | 'horizontal-center' | 'horizontal-right') {
    const forAll = (callback: (next: Shape, first: Shape) => void) => {
      if (this.state.shapes.selecteds.count < 2) return
      this.state.shapes.selecteds.forEach((shape, index, array) => {
        if (index === 0) return
        callback(shape, array[0])
      })
    }
    switch (side) {
      case 'vertical-top':
        forAll((next, first) => {
          if (next.type === 'rectangle' && first.type === 'rectangle') {
            const y = first.rect.y - next.rect.y
            next.rect.y += y
          }
        })
        break
      case 'vertical-center':
        forAll((next, first) => {
          if (next.type === 'rectangle' && first.type === 'rectangle') {
            const y = first.rect.absCenter.y - next.rect.absCenter.y
            next.rect.y += y
          }
        })
        break
      case 'vertical-bottom':
        forAll((next, first) => {
          if (next.type === 'rectangle' && first.type === 'rectangle') {
            const y = first.rect.absHeight - next.rect.absHeight
            next.rect.y += y
          }
        })
        break
      case 'horizontal-left':
        forAll((next, first) => {
          if (next.type === 'rectangle' && first.type === 'rectangle') {
            const x = first.rect.x - next.rect.x
            next.rect.x += x
          }
        })
        break
      case 'horizontal-center':
        forAll((next, first) => {
          if (next.type === 'rectangle' && first.type === 'rectangle') {
            const x = first.rect.absCenter.x - next.rect.absCenter.x
            next.rect.x += x
          }
        })
        break
      case 'horizontal-right':
        forAll((next, first) => {
          if (next.type === 'rectangle' && first.type === 'rectangle') {
            const x = first.rect.absWidth - next.rect.absWidth
            next.rect.x += x
          }
        })
        break
    }
    this.state.stateChanged('shapes', 'alignment')
  }
}