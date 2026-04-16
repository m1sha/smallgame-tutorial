import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: "hello!!!" });
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
})
