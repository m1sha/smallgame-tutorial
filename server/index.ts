import express from 'express'
import cors from 'cors'
import { addWelcomeEndpoint, addVscodeEndpoints, addCreateExampleEndpoints } from './code'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

addWelcomeEndpoint(app)
addVscodeEndpoints(app)
addCreateExampleEndpoints(app)

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
})

