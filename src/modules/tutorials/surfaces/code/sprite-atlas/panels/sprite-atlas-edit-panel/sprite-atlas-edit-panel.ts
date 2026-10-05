import { loadBlob, Point, Rect, Surface } from "smallgame"
import { createReactiveData, Panel } from "../../../../../../../components/example"
import SpriteAtlasEditPanelComponent from "./components/sprite-atlas-edit-panel-component.vue"
import { Box, SpriteAtlasEditPanelData } from "./sprite-atlas-edit-panel-data"
import { filterSmallBoundingBoxes, findSpriteBoundingBoxes } from "./helpers"

export class SpriteAtlasEditPanel extends Panel<SpriteAtlasEditPanelData> {
  img: Surface | null = null
  constructor () {
    super('Sprite Atlas Editor', SpriteAtlasEditPanelComponent, new Point(1500, 10))

    this.data = createReactiveData({
      boxes: [],
      editor: {
        mode: 'detection'
      },
      detection: {
        alphaThreshold: 10,
        connectivity: 4,
        minSize: 2,
        threshold: 10.025
      }
    })

    this.action = async (actionName: string, args?: any) => { 
      if (actionName === 'change-img') {
        const file = (args as File[])[0]
        this.img = await loadBlob(file)
      }

      if (actionName === 'detected') {
        const detection = this.data!.detection
        const boxes = findSpriteBoundingBoxes(this.img!.pixels.imageData, { 
          alphaThreshold: detection.alphaThreshold, 
          connectivity: detection.connectivity as any, 
          minSize: detection.minSize 
        })
        this.data!.boxes = filterSmallBoundingBoxes(boxes, detection.threshold).map(p => new Box(p))
      }
    }
  }

  get detection () {
    return this.data!.detection
  }

  get boxes () {
    return this.data!.boxes
  }

  get mode () {
    return this.data!.editor.mode
  }

  selectBoxByPoint (point: Point) {
    for (const box of this.boxes) {
      box.selected = Rect.from(box).containsPoint(point)
    }
  }

  deselectBoxes () {
    this.boxes.forEach(p => p.selected = false)
  }
}