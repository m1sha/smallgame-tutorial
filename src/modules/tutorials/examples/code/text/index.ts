import { FontVariant, FontWeight, MemSurface, Size, Sketch, Text } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const telemetry = builders.telemetry()
  const boundedBoxSize = telemetry.def('Bounded Box Size', new Size(0, 0))
  const ui = builders.ui()
  const textContent = ui.var('Text lgijDyw')
  const textColor = ui.var('#ddd')
  const textStrokeColor = ui.var('#ddd')
  const textStrokeWidth = ui.var(1)
  const textSize = ui.var(100)
  const fontName = ui.var('Ink Free')
  const fontNames = ['Arial', 'Bahnschrift', 'Bedstead', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Cascadia Code', 'Comic Sans MS', 'Consolas', 'Corbel', 'Courier New', 'Franklin Gothic', 'Gabriola', 'Georgia', 'Impact', 'Ink Free', 'MesloLGL Nerd Font', 'Segoe UI', 'System Bold', 'Tahoma', 'Terminal', 'Verdana', 'Webdings Regular', 'Wingdings Regular']
  const bold = ui.var<FontWeight>('normal')
  const bolds:FontWeight[] = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
  const italic = ui.var(false)
  const fontVariant =  ui.var(false)
  const letterSpacing = ui.var(0)
  const paintOrder = ui.var(false)
  const hideBounedBox = ui.var(false)
  const surface = new MemSurface(viewer.viewportRect.size)
  const render = () => {
    surface.clear()
    const text = new Text(textContent.value, { 
      color: textColor.value, 
      fontSize: textSize.value + 'px', 
      outlineColor: textStrokeColor.value,
      outlineWidth: textStrokeWidth.value,
      fontName: fontName.value,
      bold: bold.value,
      italic: italic.value,
      fontVariant: fontVariant.value ? 'small-caps' : 'normal',
      letterSpacing: letterSpacing.value + 'px',
      paintOrder: paintOrder.value ? 'stroke':  'fill'
    })
    
    text.pos = surface.rect.center.shift(text.bounds.absCenter.neg())
    boundedBoxSize.value = text.bounds.size
    text.draw(surface)

    if (!hideBounedBox.value)
      Sketch.new()
        .rect({ stroke: '#999', lineDash: [7, 5] }, text.bounds.shift(text.pos))
        .circle({ fill: 'rgb(33, 128, 252)' }, text.pos, 4)
        .circle({ fill: '#191' }, surface.rect.center, 5)
        .draw(surface)
  }

  const grText = ui.group('Text', gr => gr.expand())
  grText.input('Content', () => render(), textContent)
  grText.switch('Hide Bounded Box', () => render(), hideBounedBox)
  const grTextStyle = ui.group('Style', gr => gr.expand())
  grTextStyle.color('Fill', () => render(), textColor)
  grTextStyle.color('Stroke', () => render(), textStrokeColor)
  grTextStyle.tracker('Stroke Width', 1, 30, 1, () => render(), textStrokeWidth)
  grTextStyle.tracker('Font Size', 8, 300, 1, () => render(), textSize)
  grTextStyle.tracker('Letter Spacing', -20, 100, 1, () => render(), letterSpacing)
  grTextStyle.select('Font Name', fontNames, v => { fontName.value = v; render() }, fontName.value )
  grTextStyle.select('Bold', bolds, val => { bold.value = val as FontWeight; render() }, bold.value)
  grTextStyle.switch('Italic', () => render(), italic)
  grTextStyle.switch('Small Caps', () => render(), fontVariant)
  grTextStyle.switch('Stroke Below Fill', () => render(), paintOrder)

  render()
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(surface, surface.rect)
    displayFps(fps)
  }
}
