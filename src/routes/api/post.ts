import { Router } from 'express'
import { AddPostController } from '@/controllers/posts/add-post-controller/add-post-controller'
import { DeletePostController } from '@/controllers/posts/delete-post-controller/delete-post-controller'
import { GetPostsController } from '@/controllers/posts/get-posts-controller/get-posts-controller'
import { GetPostController } from '@/controllers/posts/get-post-controller/get-post-controller'
import { UpdatePostController } from '@/controllers/posts/update-post-controller/update-post-controller'
import { adaptRoute } from '../../helpers/express/express-route-adapter'

const postRoutes = Router()

postRoutes
  .route('/')
  .post(adaptRoute(new AddPostController()))
  .get(adaptRoute(new GetPostsController()))

postRoutes
  .route('/:id')
  .get(adaptRoute(new GetPostController()))
  .delete(adaptRoute(new DeletePostController()))
  .put(adaptRoute(new UpdatePostController()))

export { postRoutes }
