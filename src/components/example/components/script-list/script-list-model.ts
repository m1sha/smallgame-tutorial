import { Client, OkResult } from "../../../../api"

export type ScriptItem = {id: string, name: string, category: string, subCategory: string, codeDir: string }

export class ProjectCategory {
  name: string
  subCategories: ProjectSubCategory[] = []
  projects: Project[] = []

  constructor (item: ScriptItem) {
    this.name = item.category
    this.addProject(item)
  }

  addProject (item: ScriptItem) {
    if (item.subCategory) {
      const subCategory = this.subCategories.find(p => p.name === item.subCategory)
      if (subCategory) {
        subCategory.addProject(item)
        return
      }
      this.subCategories.push(new ProjectSubCategory(item))
      return
    }
    this.projects.push(new Project(item))
  }

  //private createSub
}

export class ProjectSubCategory {
  name: string
  projects: Project[] = []

  constructor (item: ScriptItem) {
    this.name =  item.subCategory
    this.addProject(item)
  }

  addProject (item: ScriptItem) {
    this.projects.push(new Project(item))
  }
}

export class Project {
  id: string 
  name: string 
  category: string 
  subCategory: string 
  codeDir: string
  
  constructor (item: ScriptItem) {
    this.id = item.id
    this.name = item.name
    this.category = item.category
    this.subCategory = item.subCategory
    this.codeDir = item.codeDir
  }
}

export class ScriptListModel {
  categories: ProjectCategory[]
  searchText: string = ''
  constructor (private items: ScriptItem[]) {
    this.make()
  }

  search (value: string) {
    this.searchText = value
    this.make()
  }

  async openInVsCode (id: string) {
    const item = this.items.find(p => p.id === id)
    if (!item) {
      console.error('Item is not foound. Id ' + id)
      return { ok: false }
    }
    return await Client.get<OkResult>(`openInCode/?path=${item.codeDir}`)
  }

  get isEmptySearch () {
    return this.search && !this.categories.length
  }

  private make () {
    const categories: ProjectCategory[] = []
    
    for (const item of this.items) {
      const category = categories.find(p => p.name === item.category)
      if (category) {
        if (this.filter(item))
          category.addProject(item)
        continue
      }
      if (this.filter(item)) categories.push(new ProjectCategory(item))
    }

    this.categories = categories
  }

  private filter (item: ScriptItem) {
    if (!this.searchText) return true
    const val = this.searchText.toLocaleLowerCase()
    const hasCat = item.category.toLocaleLowerCase().includes(val)
    const hasSub = (item.subCategory || '').toLocaleLowerCase().includes(val)
    const hasName = item.name.toLocaleLowerCase().includes(val)

    return hasCat || hasSub || hasName
  }
}