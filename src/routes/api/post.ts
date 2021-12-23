import { Router } from 'express'
import { AddPostController } from '../../controllers/posts/add-post-controller'
import { adaptRoute } from '../../helpers/express/express-route-adapter'

const postRoutes = Router()

postRoutes
  .route('/')
  .post(adaptRoute(new AddPostController()))

export { postRoutes }
