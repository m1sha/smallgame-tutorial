
import { EntityListBuilder } from "../../../../../../components/example";
import { ListEntityCollection } from "../../../../../../components/example/code/enity-list/collections";
import { EditorState } from "../../editor-state";
import { Shape } from "../../editor-state/shapes";

export class Entities  {
 private shapeList: ListEntityCollection<Shape>
  constructor (entitiesBulder: EntityListBuilder, private state: EditorState) {
    this.shapeList = entitiesBulder.addList<Shape>(shape => ({ caption: shape.type }))
    this.shapeList.onSelect = shape => {
      //state.changeTool('select')
      state.selectedShapes.attachToSelected(shape, true)
    }
    this.shapeList.onDelete = shape => {
      state.deleteShape(shape)
    }
  }

  select () {
    this.shapeList.select(this.state.selectedShapes.items as Shape[])
  }

  update () {
    this.shapeList.clear()
    this.state.shapes.items.forEach(shape => this.shapeList.add(shape as Shape))
  }
}