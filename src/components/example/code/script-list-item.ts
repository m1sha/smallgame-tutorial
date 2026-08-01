export interface IScriptListItem {
  id: number
  name: string
  categoryId: number
  subCategoryId?: number | undefined
  codeDir: string
}