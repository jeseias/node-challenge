import { Controller } from '../../controllers/controller-protocols'
import { AddPostController } from '../../controllers/posts/add-post-controller/add-post-controller'
import { GetPostController } from '../../controllers/posts/get-post-controller/get-post-controller'
import { GetPostsController } from '../../controllers/posts/get-posts-controller/get-posts-controller'
import { UpdatePostController } from '../../controllers/posts/update-post-controller/update-post-controller'
import { DeletePostController } from '../../controllers/posts/delete-post-controller/delete-post-controller'
import { PostMongoRepository } from '../../helpers/mongo/posts/post-mongo-repository'
import { Validation } from '../validators/validation-protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../helpers/validators'

export const makeAddPostController = (): Controller => {
  const validations: Validation[] = []
  for (const field of ['title', 'body', 'tags']) {
    validations.push(new RequiredFieldValidation(field))
  }
  const Validator = new ValidationComposite(validations)
  const postMongoRepository = new PostMongoRepository()
  return new AddPostController(postMongoRepository, Validator)
}

export const makeGetPostController = (): Controller => {
  const Validator = new RequiredFieldValidation('id')
  const postMongoRepository = new PostMongoRepository()
  return new GetPostController(postMongoRepository, Validator)
}

export const makeGetAllPostController = (): Controller => {
  const postMongoRepository = new PostMongoRepository()
  return new GetPostsController(postMongoRepository)
}

export const makeUpdatePostController = (): Controller => {
  const Validator = new RequiredFieldValidation('id')
  const postMongoRepository = new PostMongoRepository()
  return new UpdatePostController(postMongoRepository, Validator)
}

export const makeDeletePostController = (): Controller => {
  const Validator = new RequiredFieldValidation('id')
  const postMongoRepository = new PostMongoRepository()
  return new DeletePostController(postMongoRepository, Validator)
}
