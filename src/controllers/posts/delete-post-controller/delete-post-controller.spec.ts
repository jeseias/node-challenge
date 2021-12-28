import { MissingParamError } from '@/helpers/errors'
import { badRequest } from '@/helpers/http/http-helpers'
import { HttpRequest } from '@/helpers/http/http-protocols'
import { LoadPostById } from '@/helpers/protocols/load-post-by-id'
import { Validation } from '@/helpers/validators/validation-protocols'
import { PostModel } from '@/models/posts'
import { makeFakePost } from '../__tests__/mock-post'
import { makeValidation } from '../__tests__/mock-validation'
import { DeletePostController } from './delete-post-controller'

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { id: 'any_id' }
})

const makeLoadPostById = (): LoadPostById => {
  class LoadPostByIdSpy implements LoadPostById {
    async load (id: string): Promise<PostModel> {
      return makeFakePost()
    }
  }

  return new LoadPostByIdSpy()
}

interface SutTypes {
  sut: DeletePostController
  loadPostByIdSpy: LoadPostById
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const validationSpy = makeValidation()
  const loadPostByIdSpy = makeLoadPostById()
  const sut = new DeletePostController(loadPostByIdSpy, validationSpy)
  return {
    sut,
    loadPostByIdSpy,
    validationSpy
  }
}

describe('DeletePostController', () => { 
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

  it('Should call LoadPostById with correct id', async () => {
    const { sut, loadPostByIdSpy } = makeSut()
    const loadSpy = jest.spyOn(loadPostByIdSpy, 'load')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return 400 if no Post is found with that id', async () => {
    const { sut, loadPostByIdSpy } = makeSut()
    jest.spyOn(loadPostByIdSpy, 'load').mockReturnValueOnce(null)
    const httpResponse =  await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Post not found')))
  })
})
