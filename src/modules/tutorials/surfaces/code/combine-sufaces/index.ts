import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { loadBlob, MemSurface, setSize } from "smallgame"
import { TexturePacker } from "smallgame/src/utils/pack"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const texPack = new TexturePacker(512, 512)
  const atlas = new MemSurface(setSize(512, 512))
  atlas.fill('#696969')
  atlas.rect.center = viewer.viewportRect.center

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(atlas, atlas.rect)
    

    //Surface.combine()
    displayFps(fps)
  }

  const ui = builders.ui()
  ui.uploadMany('Upload Tilesheets', async files => {
    for (const file of files) {
      const sprite = await loadBlob(file)
      const rect = texPack.pack(sprite.width, sprite.height)
      if (!rect) break
      atlas.blit(sprite, rect)
      console.log(file.name)
    }
  })
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
