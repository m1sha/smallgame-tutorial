import { download } from "../../../../../../utils";
import { EditorState } from "../editor-state";

export function save (state: EditorState) {
 let data = '@ve_1.0\n'
  for (const shape of state.shapes.items) {
    const style = `fill:${shape.style.fill};stroke:${shape.style.stroke};lineWidth:${shape.style.lineWidth}`

    if (shape.type === 'rectangle') {
      data += `rect [${style}] ${Math.round(shape.rect.x)},${Math.round(shape.rect.y)},${Math.round(shape.rect.width)},${Math.round(shape.rect.height)}\n`
    }
    if (shape.type === 'polygon') { 
      const points = shape.points.map(p => `${Math.round(p.x)},${Math.round(p.y)}`).join(',')
      data += `polygon [${style}] ${points}\n`
    }
  }
  download('file.txt', data)
}