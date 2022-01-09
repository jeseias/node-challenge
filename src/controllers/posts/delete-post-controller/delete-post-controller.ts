import { serverError, deleted, badRequest } from '../../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../../helpers/http/http-protocols'
import { Controller } from '../../../controllers/controller-protocols'
import { Validation } from '../../../helpers/validators/validation-protocols'
import { RemovePostById } from '../../../helpers/protocols/remove-post-by-id'

export class DeletePostController implements Controller {
  constructor (
    private readonly removePostById: RemovePostById,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const post = await this.removePostById.remove(id)
      if (!post.id) {
        return badRequest(new Error('Post not found'))
      }
      return deleted()
    } catch (error) {
      return serverError(error)
    }
  }
}
