import { serverError, ok } from '../../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../../helpers/http/http-protocols'
import { Controller } from '../../../controllers/controller-protocols'
import { LoadPosts } from '../../../helpers/protocols/load-posts'

export class GetPostsController implements Controller {
  constructor (
    private readonly loadPosts: LoadPosts,
  ) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { query } = httpRequest
      const limit = parseInt(query.limit || 3)
      const page = parseInt(query.page || 1)
      const posts = await this.loadPosts.loadAll(limit, page)
      return ok(posts)
    } catch (error) {
      return serverError(error)
    }
  }
}
