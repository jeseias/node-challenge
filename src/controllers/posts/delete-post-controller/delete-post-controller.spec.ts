import { badRequest } from '../../../helpers/http/http-helpers'
import { HttpRequest } from '../../../helpers/http/http-protocols'
import { RemovePostById } from '../../../helpers/protocols/remove-post-by-id'
import { Validation } from '../../../helpers/validators/validation-protocols'
import { PostModel } from '../../../models/posts'
import { makeFakePost } from '../__mocks__/mock-post'
import { makeValidation } from '../__mocks__/mock-validation'
import { DeletePostController } from './delete-post-controller'

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { id: 'any_id' }
})

const makeRemovePostById = (): RemovePostById => {
  class RemovePostByIdSpy implements RemovePostById {
    async remove (id: string): Promise<PostModel> {
      return makeFakePost()
    }
  }

  return new RemovePostByIdSpy()
}

interface SutTypes {
  sut: DeletePostController
  removePostByIdSpy: RemovePostById
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const validationSpy = makeValidation()
  const removePostByIdSpy = makeRemovePostById()
  const sut = new DeletePostController(removePostByIdSpy, validationSpy)
  return {
    sut,
    removePostByIdSpy,
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
    const { sut, removePostByIdSpy } = makeSut()
    const removeSpy = jest.spyOn(removePostByIdSpy, 'remove')
    await sut.handle(makeFakeHttpRequest())
    expect(removeSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return 400 if no Post is found with that id', async () => {
    const { sut, removePostByIdSpy } = makeSut()
    jest.spyOn(removePostByIdSpy, 'remove').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Post not found')))
  })
})
