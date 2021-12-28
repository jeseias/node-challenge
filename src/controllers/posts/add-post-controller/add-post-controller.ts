import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '@/helpers/http/http-protocols'
import { Controller } from '@/controllers/controller-protocols'
import { AddPost } from '@/helpers/protocols/add-post'
import { Validation } from '@/helpers/validators/validation-protocols'

export class AddPostController implements Controller {
  constructor (
    private readonly addPost: AddPost,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
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
