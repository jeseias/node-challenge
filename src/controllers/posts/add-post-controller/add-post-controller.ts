import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '@/helpers/http/http-protocols'
import * as MongoHelper from '@/helpers/mongo/mongo-helper'
import { Controller } from '@/controllers/controller-protocols'
import { Post } from '@/models/posts'
import { v4 as uuid } from 'uuid'

export class AddPostController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['title', 'body', 'tags']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { title, body, tags } = httpRequest.body
      const posts = await Post.insertMany({
        _id: uuid(),
        title,
        body,
        tags
      })
      const post = posts[0]
      const mappedPost = MongoHelper.map(post)
      return ok(mappedPost)
    } catch (error) {
      return serverError(error)
    }
  }
}
