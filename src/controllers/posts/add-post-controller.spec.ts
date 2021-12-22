import { badRequest } from '../../helpers/http/http-helpers'
import { HttpRequest } from '../../helpers/http/http-protocols'
import { Validation } from '../../helpers/validators/validation-protocols'
import { AddPostController } from './add-post-controller'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    body: 'any_body',
    tags: ['any_tag']
  }
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: AddPostController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new AddPostController(validationStub)

  return {
    sut,
    validationStub
  }
}

describe('Posts Controller', () => {
  it('should call validate  with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith({
      title: 'any_title',
      body: 'any_body',
      tags: ['any_tag']
    })
  })
  it('should return a 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })
})
