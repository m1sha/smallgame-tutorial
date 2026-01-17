import { ImageDisplayObject } from "./image"
import { DisplayImagesCombinerObject } from "./images-combine/images-combiner-display-object"
import { DisplaySpriteSheetObject } from "./sprite-sheet/sprite-sheet-display-object"
import { TilemapDisplayObject } from "./tilemap"

export type DisplayObject = 
  | ImageDisplayObject
  | DisplaySpriteSheetObject 
  | DisplayImagesCombinerObject 
  | TilemapDisplayObject