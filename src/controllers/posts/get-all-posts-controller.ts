import { serverError, ok } from '../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../helpers/http/http-protocols'
import { Controller } from '../controller-protocols'
import { Post } from '../../models/posts'
import { map } from '../../helpers/mongo/mongo-helper'

export class GetAllPostController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const posts = await Post.find()
      const mappedPosts = posts.map(post => map(post))
      return ok(mappedPosts)
    } catch (error) {
      return serverError(error)
    }
  }
}
