import { Router } from 'express'
import { AddPostController } from '../../controllers/posts/add-post-controller'
import { GetAllPostController } from '../../controllers/posts/get-all-posts-controller'
import { GetOnePostController } from '../../controllers/posts/get-one-post-controller'
import { adaptRoute } from '../../helpers/express/express-route-adapter'

const postRoutes = Router()

postRoutes
  .route('/')
  .post(adaptRoute(new AddPostController()))
  .get(adaptRoute(new GetAllPostController()))

postRoutes
  .route('/:id')
  .get(adaptRoute(new GetOnePostController()))

export { postRoutes }
