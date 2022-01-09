import { serverError, ok, badRequest } from '../../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../../helpers/http/http-protocols'
import { Controller } from '../../../controllers/controller-protocols'
import { Validation } from '../../../helpers/validators/validation-protocols'
import { LoadPostById } from '../../../helpers/protocols/load-post-by-id'

export class GetPostController implements Controller {
  constructor (
    private readonly loadPostById: LoadPostById,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const post = await this.loadPostById.loadOne(id)
      if (!post.id) {
        return badRequest(new Error('Post not found'))
      }
      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}
