import { badRequest, ok } from '../../helpers/http/http-helpers'
import { HttpRequest } from '../../helpers/http/http-protocols'
import { AddPost } from '../../helpers/usecases/add-post'
import { Validation } from '../../helpers/validators/validation-protocols'
import { AddPostModel, PostModel } from '../../models/posts'
import { AddPostController } from './add-post-controller'

const makeFakePost = (): PostModel => ({
  id: 'valid_id',
  title: 'valid_title',
  body: 'valid_body',
  tags: ['valid_tag']
})

const makeAddPost = (): AddPost => {
  class AddAccountStub implements AddPost {
    async add (account: AddPostModel): Promise<PostModel> {
      return new Promise(resolve => resolve(makeFakePost()))
    }
  }
  return new AddAccountStub()
}

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
  addPostStub: AddPost
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addPostStub = makeAddPost()
  const sut = new AddPostController(validationStub, addPostStub)

  return {
    sut,
    validationStub,
    addPostStub
  }
}

describe('AddPostController', () => {
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
  it('should call AddPost with correct values', async () => {
    const { sut, addPostStub } = makeSut()
    const addSpy = jest.spyOn(addPostStub, 'add')
    await sut.handle(makeFakeHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      title: 'any_title',
      body: 'any_body',
      tags: ['any_tag']
    })
  })
  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakePost()))
  })
})
