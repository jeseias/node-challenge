import { HttpRequest, HttpResponse } from '../../helpers/http/http-protocols'
import { Validation } from '../../helpers/validators/validation-protocols'
import { Controller } from '../controller-protocols'

export class AddPostController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}
