import { serverError, ok, badRequest } from '../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../helpers/http/http-protocols'
import { Controller } from '../controller-protocols'
import { Post } from '../../models/posts'
import { map } from '../../helpers/mongo/mongo-helper'

export class UpdateOnePostController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const { title, body, tags } = httpRequest.body
      const post = await Post.findByIdAndUpdate(
        { _id: id },
        {
          title, body, tags
        }, { new: true })
      if (!post) {
        return badRequest(new Error('Document not found'))
      }
      const mappedPost = map(post)
      return ok(mappedPost)
    } catch (error) {
      return serverError(error)
    }
  }
}
