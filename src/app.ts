import express from 'express'
import cors from 'cors'
import { postRoutes } from './routes/api/post'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

app.use('/api/posts', postRoutes)

dotenv.config({ path: path.resolve(__dirname, '..', '.config.env') })
const PORT = process.env.PORT || 3333

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connection to database is a success'))
  .catch((err) => console.log('Error connecting to database', err))

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`)
})
