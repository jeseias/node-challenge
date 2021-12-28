import { serverError, ok } from '@/helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '@/helpers/http/http-protocols'
import { Controller } from '@/controllers/controller-protocols'
import { Post } from '@/models/posts'
import * as MongoHelper from '@/helpers/mongo/mongo-helper'

export class GetPostsController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { query } = httpRequest
      const limit = parseInt(query.limit || 3)
      const page = parseInt(query.page || 1)
      const queryString = Post.find().skip((page - 1) * limit).limit(limit)
      const posts = await queryString
      const mappedPosts = posts.map(post => MongoHelper.map(post))
      return ok(mappedPosts)
    } catch (error) {
      return serverError(error)
    }
  }
}
