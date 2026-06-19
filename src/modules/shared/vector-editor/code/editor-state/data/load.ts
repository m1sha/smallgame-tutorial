import { Point, Rect, ShapeStyle } from "smallgame";
import { EditorState } from "../editor-state";
import { PolygonShape, RectangleShape } from "../shapes";

export async function loadState (state: EditorState, file: File | string) {
  const content = file instanceof File ? await loadFile(file): file
  const lines = content.toString().replaceAll('\r', '').split('\n')
  if (lines[0] !== '@ve_1.0') throw Error('File is not Vector Editor format!')
  parse (state, lines)
  state.stateChanged('shapes', 'created')
}

const loadFile = async (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => {
    const content = reader.result
    if (!content) return
    resolve(content as string)
  }
  reader.readAsText(file)
})


function parse (state: EditorState, lines: string[]) {
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('rect')) {
      parseRect(state, line)
    }

    if (line.startsWith('polygon')) {
      parsePolygon(state, line)
    }
  }
}

function parseRect (state: EditorState, line: string) {
  const { paramters, style } =  parseCommon(line.replaceAll('rect', '').trimStart())
  const shape = new RectangleShape(Point.zero, style)
  shape.rect = new Rect(paramters[0], paramters[1], paramters[2], paramters[3])
  state.shapes.add(shape)
}

function parsePolygon (state: EditorState, line: string) {
  const { paramters, style } =  parseCommon(line.replaceAll('rect', '').trimStart())
  const shape = new PolygonShape(Point.zero, Point.zero, style)
  const points: Point[] = []
  for (let i = 0; i < paramters.length; i+=2) {
    points.push(new Point(paramters[i], paramters[i + 1]))
  }
  shape.setPoints(points)
  state.shapes.add(shape)
}

function parseCommon (line: string) {
  let styleRaw = ''
  let paramtersRaw = ''
  let startStyle = false
  let startParamters = false
  
  for (let i = 0; i < line.length; i++) {
    const chr = line.charAt(i)
    if (chr === ' ') { continue }
    if (chr === '[') {
      startStyle = true
      continue
    }

    if (chr === ']' && startStyle) {
      startStyle = false
      startParamters = true
      continue
    }

    if (startStyle) {
      styleRaw += chr
      continue
    }

    if (startParamters) {
      paramtersRaw += chr
    }
  }

  const paramters = paramtersRaw.split(',').map(p => parseInt(p.trim()))

  const style = parseStyle(styleRaw)
  return {
    paramters,
    style
  }
}

function parseStyle (styleRaw: string) {
  const result = new ShapeStyle({})
  const tokens = styleRaw.split(';')
  for (const token of tokens) {
    const [param, value] = token.split(':')
    if (param === 'fill') result.fill = value
    if (param === 'stroke') result.stroke = value
    if (param === 'lineWidth') result.lineWidth = +value
  }

  return result
}