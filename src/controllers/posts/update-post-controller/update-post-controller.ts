import { serverError, ok, badRequest } from '../../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../../helpers/http/http-protocols'
import { Controller } from '../../../controllers/controller-protocols'
import { Validation } from '../../../helpers/validators/validation-protocols'
import { UpdatePostById } from '../../../helpers/protocols/update-post-by-id'

export class UpdatePostController implements Controller {
  constructor (
    private readonly removePostById: UpdatePostById,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { title, body, tags } = httpRequest.body
      const post = await this.removePostById.update(
        id,
        {
          title,
          body,
          tags
        }
      )
      if (!post) {
        return badRequest(new Error('Post not found'))
      }
      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}
