const scripts = import.meta.glob('./**/index.ts')

const runScript = async (path: string, data: any) => {
  const module = (await scripts[`./${path}/index.ts`]()) as any
  return module.default(data)
}

export { runScript }