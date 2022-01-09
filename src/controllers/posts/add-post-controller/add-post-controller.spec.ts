import { badRequest, created, serverError } from '../../../helpers/http/http-helpers'
import { HttpRequest } from '../../../helpers/http/http-protocols'
import { AddPost } from '../../../helpers/protocols/add-post'
import { Validation } from '../../../helpers/validators/validation-protocols'
import { PostModel, AddPostModel } from '../../../models/posts'
import { AddPostController } from './add-post-controller'

import { makeFakePost } from '../__mocks__/mock-post'
import { makeValidation } from '../__mocks__/mock-validation'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    body: 'any_body',
    tags: ['any_tag']
  }
})

const makeAddPost = (): AddPost => {
  class AddPostSpy implements AddPost {
    async add (addPostModel: AddPostModel): Promise<PostModel> {
      return makeFakePost()
    }
  }
  return new AddPostSpy()
}

interface SutTypes {
  sut: AddPostController
  addPostSpy: AddPost
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const addPostSpy = makeAddPost()
  const validationSpy = makeValidation()
  const sut = new AddPostController(addPostSpy, validationSpy)
  return {
    sut,
    addPostSpy,
    validationSpy
  }
}

describe('AddPostController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 bad request if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })

  it('Should throw if AddPost throws', async () => {
    const { sut, addPostSpy } = makeSut()
    jest.spyOn(addPostSpy, 'add').mockImplementationOnce(async => {
      throw new Error('any_error')
    })
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })

  it('Should call AddPost with correct values', async () => {
    const { sut, addPostSpy } = makeSut()
    const addSpy = jest.spyOn(addPostSpy, 'add')
    await sut.handle(makeFakeHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      title: 'any_title',
      body: 'any_body',
      tags: ['any_tag']
    })
  })

  it('Should return a Post if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(created(makeFakePost()))
  })
})
