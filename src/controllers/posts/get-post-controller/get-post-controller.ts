import { serverError, ok, badRequest } from '../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../helpers/http/http-protocols'
import { Controller } from '../controller-protocols'
import { Post } from '../../models/posts'
import { map } from '../../helpers/mongo/mongo-helper'

export class GetPostController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const post = await Post.find({ _id: id })
      if (!post[0]) {
        return badRequest(new Error('Document not found'))
      }
      const mappedPost = map(post[0])
      return ok(mappedPost)
    } catch (error) {
      return serverError(error)
    }
  }
}
