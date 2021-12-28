import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '@/helpers/http/http-protocols'
import { Controller } from '@/controllers/controller-protocols'
import { AddPost } from '@/helpers/protocols/add-post'

export class AddPostController implements Controller {
  constructor (
    private readonly addPost: AddPost
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['title', 'body', 'tags']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { title, body, tags } = httpRequest.body
      const post = await this.addPost.add({
        title,
        body,
        tags
      })
      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}
