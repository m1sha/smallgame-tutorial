import { exec } from 'node:child_process'
import { resolve } from 'node:path'

export async function openInVSCode(targetPath: string, options = {}) {
  const absPath = resolve(targetPath)
  const args = []
  args.push(`"${absPath}"`)

  //if (options.line) {
  //  const col = options.column ?? 1
  //  // Format: file:line:col
  //  args.push('-g', `${absPath}:${options.line}:${col}`)
  //} else {
  //  args.push(`"${absPath}"`)
  //}
  
  const codeCmd = (() => {
    //if (platform() === 'win32') {
    //  return '"C:\\Program Files\\Microsoft VS Code\\Code.exe"'
    //}
    return 'code'
  })()
  
  const command = `${codeCmd} ${args.join(' ')}`

  exec(command)

  //return new Promise((resolvePromise, rejectPromise) => {
  //  exec(command, (error, stdout, stderr) => {
  //    if (error) {
  //      rejectPromise(
  //        new Error(`Can't open VS Code: ${error.message}\n${stderr}`)
  //      )
  //      return
  //    }
  //    resolvePromise(undefined)
  //  })
  //})
} 