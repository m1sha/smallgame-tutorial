import { Point, Rect, Size, Sketch } from "smallgame"
import { GameBase } from "../../station"
import { Scene } from "../../station/base/scene";
import { SnakeGameScene } from "./snake-scene";

export class SnakeGame extends GameBase {
  resolution: Size = new Size(768, 414) //new Size(260, 224)
  scenes: Scene[] = [
    new SnakeGameScene(this)
  ]
}