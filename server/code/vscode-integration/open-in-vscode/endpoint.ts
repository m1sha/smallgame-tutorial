import { Express, Request, Response } from 'express'
import { openInVSCode } from './open-in-vscode'

export function addVscodeEndpoints (app: Express) {
  app.get('/api/openInCode', async (req: Request, res: Response) => {
    const x = req.query.path as string
    openInVSCode(`../src/modules/tutorials/${x}/index.ts`)
    res.json({ ok: true });
  })
}