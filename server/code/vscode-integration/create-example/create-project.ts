import { resolve } from 'node:path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'

import items from '../../../../src/modules/tutorials/script-list.json'
import categories from '../../../../src/modules/tutorials/script-categories.json'

export function createProject (name: string, title: string, categoryId: string, subCategoryId: string) {
  const category = categories.find(p => p.id === +categoryId)
  if (!category) {
    console.error('A category is not found by id = ' + categoryId)
    return
  }

  if (items.some(p => p.name === title)) {
    console.error(`The project ${title} already exist`)
    return
  }
  
  const item = addProject(name, title, category, +subCategoryId)
  createScriptFromTemplate(category.template, `${category.dir}/${name}`)
  return item
}

function addProject (name: string, title: string, category: { id: number, dir: string }, subCategoryId: number) {
  const id = Math.max.apply(null, items.map(p => p.id)) + 1
  const item = { id, name: title, categoryId: category.id, subCategoryId: subCategoryId, codeDir: category.dir + '/' + name }
  items.push(item)

  const content = JSON.stringify(items, null, 2)
  const filename = resolve(`../src/modules/tutorials/script-list.json`)
  writeFileSync(filename, content, 'utf8')
  console.log(`The project ${title} added`)
  return item
}

function createScriptFromTemplate (template: string, dir: string) {
  const scriptDir = resolve(`../src/modules/tutorials/${dir}`)
  mkdirSync(scriptDir)

  switch (template) {
    case 'default': {
      let content = readFileSync(resolve(`../src/modules/tutorials/templates/default/index.ts.template`), 'utf8')
      if (!dir.endsWith('code')) content = content.replace('../../../', '../../')
      writeFileSync(resolve(`../src/modules/tutorials/${dir}/index.ts`), content, 'utf8')
      console.log(`The (default) template ${dir} created`)
      break
    }
    case 'webgl': {
      let indexContent = readFileSync(resolve(`../src/modules/tutorials/templates/webgl/index.ts.template`), 'utf8')
      let fragShaderContent = readFileSync(resolve(`../src/modules/tutorials/templates/webgl/shaders/frag.ts.template`), 'utf8')
      let vertShaderContent = readFileSync(resolve(`../src/modules/tutorials/templates/webgl/shaders/vert.ts.template`), 'utf8')
      writeFileSync(resolve(`../src/modules/tutorials/${dir}/index.ts`), indexContent, 'utf8')
      mkdirSync(resolve(`../src/modules/tutorials/${dir}/shaders`))
      writeFileSync(resolve(`../src/modules/tutorials/${dir}/shaders/frag.ts.ts`), fragShaderContent, 'utf8')
      writeFileSync(resolve(`../src/modules/tutorials/${dir}/shaders/vert.ts.ts`), vertShaderContent, 'utf8')
      break
    }
    case 'glsl': {
      let indexContent = readFileSync(resolve(`../src/modules/tutorials/templates/glsl/index.ts.template`), 'utf8')
      let shaderContent = readFileSync(resolve(`../src/modules/tutorials/templates/glsl/shader.ts.template`), 'utf8')
      writeFileSync(resolve(`../src/modules/tutorials/${dir}/index.ts`), indexContent, 'utf8')
      writeFileSync(resolve(`../src/modules/tutorials/${dir}/shader.ts`), shaderContent, 'utf8')
      break
    }
  }
}