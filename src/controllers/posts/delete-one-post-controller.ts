import { serverError, ok, badRequest } from '../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../helpers/http/http-protocols'
import { Controller } from '../controller-protocols'
import { Post } from '../../models/posts'

export class DeleteOnePostController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const post = await Post.findByIdAndDelete({ _id: id })
      if (!post) {
        return badRequest(new Error('Document not found'))
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
