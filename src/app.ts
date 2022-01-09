import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import swaggerJsDocs from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './helpers/docs/swagger-options'
import { postRoutes } from './routes/api/post'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xXssProtection from 'x-xss-protection'
import hpp from 'hpp'
import compression from 'compression'

const app = express()

app.enable('trust proxy')

// Middlewares
app.use(cors())
app.use(express.json())

app.use(helmet())

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter)

app.use(mongoSanitize())

app.use(xXssProtection())

app.use(
  hpp({
    whitelist: [
      'page',
      'duration'
    ]
  })
)

app.use(compression())

const swaggerDocs = swaggerJsDocs(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/posts', postRoutes)

dotenv.config({ path: path.resolve(__dirname, '..', '.config.env') })

export { app }
