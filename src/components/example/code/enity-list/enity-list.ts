export interface IEnity {
  className: string, 
  obj: any
}

export interface IEnityClass {
  name: string
  displayFormat: (value: any) => string
}


export interface IEnityList {
  items: IEnity[]
  enityClasses: IEnityClass[]
  onRemoveEnity: (enity: IEnity) => void
}