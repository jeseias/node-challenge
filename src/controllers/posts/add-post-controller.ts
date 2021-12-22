import { badRequest } from '../../helpers/http/http-helpers'
import { HttpRequest, HttpResponse } from '../../helpers/http/http-protocols'
import { AddPost } from '../../helpers/usecases/add-post'
import { Validation } from '../../helpers/validators/validation-protocols'
import { Controller } from '../controller-protocols'

export class AddPostController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPost: AddPost
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { title, body, tags } = httpRequest.body
    await this.addPost.add({
      title,
      body,
      tags
    })
    return null
  }
}
