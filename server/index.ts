import express from 'express'
import cors from 'cors'
import { addWelcomeEndpoint, addVscodeEndpoints } from './code'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

addWelcomeEndpoint(app)
addVscodeEndpoints(app)

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
})

