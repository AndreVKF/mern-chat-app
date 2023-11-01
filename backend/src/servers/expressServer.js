import cors from 'cors'
import express from 'express'
import { errors } from '../middlewares/errors.js'
import { routes } from '../routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(errors)

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Chat-App backend :)' })
})

export const expressServer = app
