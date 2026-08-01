export interface IScriptSubCategory {
  id: number
  name: string
}

export interface IScriptCategory {
  id: number
  name: string
  template: string
  subCategories: IScriptSubCategory[]
}