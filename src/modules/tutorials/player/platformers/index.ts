import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { VectorEditor } from "../../../shared/vector-editor"
import data from "./data"
import { Cursor } from "./cursor"
import { Rect, Sketch } from "smallgame"
import { Platforms } from "../shared"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const editor = new VectorEditor(viewer.surface)
  editor.useEditor(false)
  viewer.useInput(editor)

  const cursor = new Cursor()
  const platforms = new Platforms()
  await cursor.load()
  cursor.setPlatforms(platforms)
  cursor.pos.shiftSelf(300, 60) // 20, 10
  editor.onShapesChanged = shapes => platforms.add(shapes.map(shape => shape.bounds))
  
  viewer.onInput = ev => {
    if (!editor.isEditorUsed) cursor.input(ev)
  }

  viewer.onFrameChanged = frame => {
    frame.clear()
    editor.draw(frame)
    const allow = '#588868'
    const deny = '#813d47'
    const drwRect = (rect: Rect) => Sketch.new().rect({ fill: deny, stroke: deny }, rect).draw(frame)
    for (const p of platforms.items) {
      if (p.insect === 'bottom') {
        drwRect(new Rect(p.rect.x, p.rect.y, p.rect.width, 6))
      }
      if (p.insect === 'right') {
        drwRect(new Rect(p.rect.x, p.rect.y, 6,  p.rect.height))
      }
      if (p.insect === 'left') {
        drwRect(new Rect(p.rect.absWidth - 6, p.rect.y, 6,  p.rect.height))
      }
      if (p.insect === 'top') {
        const rect = new Rect(p.rect.x, p.rect.absHeight - 6, p.rect.width, 6)
        Sketch.new().rect({ fill: allow, stroke: allow }, rect).draw(frame)
      }
    }
    cursor.draw(frame)
    displayFps(fps)
  }

  const ui = builders.ui()
  const cursorGroup = ui.group('Cursor')
  cursorGroup.expand()
  cursorGroup.switch('Show Frame', val => cursor.showFrame = val, cursor.showFrame)
  cursorGroup.tracker('Fall Speed', 20, 200, 1, val => cursor.fallSpeed = val, cursor.fallSpeed)
  editor.onEditorUsed = v => { !v ? cursorGroup.show() : cursorGroup.hide() }

  const entities = builders.entities()
  editor.ui(ui, entities)
  editor.load(data)

  return {
    ui: ui.build(),
    entities: entities.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
