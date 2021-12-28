import { serverError, ok, badRequest } from '@/helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '@/helpers/http/http-protocols'
import { Controller } from '@/controllers/controller-protocols'
import { LoadPostById } from '@/helpers/protocols/load-post-by-id'
import { Validation } from '@/helpers/validators/validation-protocols'

export class DeletePostController implements Controller {
  constructor (
    private readonly loadPostById: LoadPostById,
    private readonly validation: Validation,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const post = await this.loadPostById.load(id)
      if (!post) {
        return badRequest(new Error('Post not found'))
      }
      return ok({
        statusCode: 201,
        body: 'Document deleted'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
