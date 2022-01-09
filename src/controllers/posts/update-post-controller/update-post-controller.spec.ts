import { badRequest, ok } from '../../../helpers/http/http-helpers'
import { HttpRequest } from '../../../helpers/http/http-protocols'
import { UpdatePostById } from '../../../helpers/protocols/update-post-by-id'
import { Validation } from '../../../helpers/validators/validation-protocols'
import { AddPostModel, PostModel } from '../../../models/posts'
import { makeFakePost } from '../__mocks__/mock-post'
import { makeValidation } from '../__mocks__/mock-validation'
import { UpdatePostController } from './update-post-controller'

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { id: 'any_id' },
  body: {
    title: 'any_title',
    body: 'any_body',
    tags: ['any_tag']
  }
})

const makeUpdatePostById = (): UpdatePostById => {
  class UpdatePostByIdSpy implements UpdatePostById {
    async update (id: string, data: AddPostModel): Promise<PostModel> {
      return makeFakePost()
    }
  }
  return new UpdatePostByIdSpy()
}

interface SutTypes {
  sut: UpdatePostController
  updatePostByIdSpy: UpdatePostById
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const validationSpy = makeValidation()
  const updatePostByIdSpy = makeUpdatePostById()
  const sut = new UpdatePostController(updatePostByIdSpy, validationSpy)
  return {
    sut,
    updatePostByIdSpy,
    validationSpy
  }
}

describe('UpdatePostController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  it('Should return 400 bad request if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })

  it('Should call UpdatePostById with correct values', async () => {
    const { sut, updatePostByIdSpy } = makeSut()
    const updateSpy = jest.spyOn(updatePostByIdSpy, 'update')
    await sut.handle(makeFakeHttpRequest())
    expect(updateSpy).toHaveBeenCalledWith(
      'any_id',
      {
        title: 'any_title',
        body: 'any_body',
        tags: ['any_tag']
      }
    )
  })

  it('Should return 400 if no Post is found with that id', async () => {
    const { sut, updatePostByIdSpy } = makeSut()
    jest.spyOn(updatePostByIdSpy, 'update').mockReturnValueOnce(new Error('') as any)
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Post not found')))
  })
  it('Should return 400 if no Post is found with that id', async () => {
    const { sut, updatePostByIdSpy } = makeSut()
    jest.spyOn(updatePostByIdSpy, 'update').mockReturnValueOnce(new Error('') as any)
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Post not found')))
  })
  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakePost()))
  })
})
