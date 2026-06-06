import { Point } from "smallgame"
import { ShapeBase } from "./shape-base"

export class PolygonShape extends ShapeBase  {
  type: 'polygon' 
  points: Point[]
}