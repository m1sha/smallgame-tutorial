
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
  constructor (items: ScriptItem[]) {
    const categories: ProjectCategory[] = []
    
    for (const item of items) {
      const category = categories.find(p => p.name === item.category)
      if (category) {
        category.addProject(item)
        continue
      }
      categories.push(new ProjectCategory(item))
    }

    this.categories = categories
  }
}