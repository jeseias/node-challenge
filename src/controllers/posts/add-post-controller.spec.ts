import { MissingParamError } from '../../helpers/errors/missing-param-error'
import { badRequest, ok } from '../../helpers/http/http-helpers'
import { HttpRequest } from '../../helpers/http/http-protocols'
import { AddPost } from '../../helpers/protocols/add-post'
import { AddPostModel, PostModel } from '../../models/posts'
import { AddPostController } from './add-post-controller'

const makeFakePost = (): PostModel => ({
  id: 'valid_id',
  title: 'valid_title',
  body: 'valid_body',
  tags: ['valid_tag']
})

const makeAddPost = (): AddPost => {
  class AddPostStub implements AddPost {
    async add (post: AddPostModel): Promise<PostModel> {
      return new Promise(resolve => resolve(makeFakePost()))
    }
  }
  return new AddPostStub()
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    body: 'any_body',
    tags: ['any_tag']
  }
})

interface SutTypes {
  sut: AddPostController
  addPostStub: AddPost
}

const makeSut = (): SutTypes => {
  const addPostStub = makeAddPost()
  const sut = new AddPostController(addPostStub)

  return {
    sut,
    addPostStub
  }
}

describe('AddPostController', () => {
  it('should return a MissingParamError if title is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        body: 'any_body',
        tags: ['any_tag']
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
  })
  it('should return a MissingParamError if tags is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        body: 'any_body',
        title: 'any_title'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('tags')))
  })
  it('should return a MissingParamError if body is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        title: 'any_title',
        tags: ['any_tag']
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('body')))
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
