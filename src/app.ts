import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import swaggerJsDocs from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './helpers/docs/swagger-options'
import { postRoutes } from './routes/api/post'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

const swaggerDocs = swaggerJsDocs(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/posts', postRoutes)

dotenv.config({ path: path.resolve(__dirname, '..', '.config.env') })

export { app }
