


export type DisplayObjectBase = {
  id: string
  name: string
  hidden: boolean
}

export function setDisplayObject (id: string, name: string): DisplayObjectBase {
  return {
    id,
    hidden: false,
    name
  }
}
