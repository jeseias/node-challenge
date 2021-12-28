import { Router } from 'express'
import { adaptRoute } from '@/helpers/express/express-route-adapter'
import { 
  makeAddPostController,
  makeGetPostController, 
  makeGetAllPostController, 
  makeDeletePostController, 
  makeUpdatePostController 
} from '@/helpers/factories/posts'

const postRoutes = Router()

postRoutes
  .route('/')
  .post(adaptRoute(makeAddPostController()))
  .get(adaptRoute(makeGetPostController()))

postRoutes
  .route('/:id')
  .get(adaptRoute(makeGetAllPostController()))
  .put(adaptRoute(makeUpdatePostController()))
  .delete(adaptRoute(makeDeletePostController()))

export { postRoutes }
