import { Express, Request, Response } from 'express'
import { createProject } from './create-project'

export function addCreateExampleEndpoints (app: Express) {
  app.get('/api/create-project/:name/:title/:cat{/:subcat}', async (req: Request, res: Response) => {
    const name = req.params.name as string
    const title = req.params.title as string
    const cat = req.params.cat as string
    const subcat = req.params.subcat as string
    const item = createProject(name, title, cat, subcat)
    console.log(`Project ${name} - ${title} was created.` )
    res.json(item);
  })
}