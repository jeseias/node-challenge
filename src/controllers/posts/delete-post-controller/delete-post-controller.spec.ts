import { MissingParamError } from '@/helpers/errors'
import { badRequest } from '@/helpers/http/http-helpers'
import { DeletePostController } from './delete-post-controller'

const makeSut = (): DeletePostController => {
  return new DeletePostController()
}

describe('DeletePostController', () => {
  it('should return a MissingParamError if no id is provided', async () => {
    const sut = makeSut()
    const httpsResponse = await sut.handle({ params: {} })
    expect(httpsResponse).toEqual(badRequest(new MissingParamError('id')))
  })
})
