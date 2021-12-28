import { serverError, ok, badRequest } from '@/helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '@/helpers/http/http-protocols'
import { Controller } from '@/controllers/controller-protocols'
import { Post } from '@/models/posts'
import * as MongoHelper from '@/helpers/mongo/mongo-helper'
import { Validation } from '@/helpers/validators/validation-protocols'
import { LoadPosts } from '@/helpers/protocols/load-posts'

export class GetPostsController implements Controller {
  constructor (
    private readonly loadPosts: LoadPosts,
    private readonly validation: Validation,
  ) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query)
      if (error) return badRequest(error)
      const { query } = httpRequest
      const limit = parseInt(query.limit || 3)
      const page = parseInt(query.page || 1)
      const posts = await this.loadPosts.load(limit, page)
      return ok(posts)
    } catch (error) {
      return serverError(error)
    }
  }
}
