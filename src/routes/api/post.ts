import { Router } from 'express'
import { adaptRoute } from '../../helpers/express/express-route-adapter'
import {
  makeAddPostController,
  makeGetPostController,
  makeGetAllPostController,
  makeDeletePostController,
  makeUpdatePostController
} from '../../helpers/factories/posts'

const postRoutes = Router()

postRoutes
  .route('/')
  .post(adaptRoute(makeAddPostController()))
  .get(adaptRoute(makeGetAllPostController()))

postRoutes
  .route('/:id')
  .get(adaptRoute(makeGetPostController()))
  .put(adaptRoute(makeUpdatePostController()))
  .delete(adaptRoute(makeDeletePostController()))

export { postRoutes }
