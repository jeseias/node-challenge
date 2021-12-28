import { HttpRequest, HttpResponse } from '@/helpers/http/http-protocols'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
