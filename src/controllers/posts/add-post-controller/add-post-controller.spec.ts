import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/helpers/http/http-helpers'
import { HttpRequest } from '@/helpers/http/http-protocols'
import { AddPost } from '@/helpers/protocols/add-post'
import { PostModel, AddPostModel } from '@/models/posts'
import { AddPostController } from './add-post-controller'

const makeFakePost = (): PostModel => ({
  id: 'any_id',
  title: 'any_title',
  body: 'any_body',
  tags: ['any_tag']
})

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
  addPost: AddPost
}

const makeSut = (): SutTypes => {
  const addPost = makeAddPost()
  const sut = new AddPostController(addPost)
  return {
    sut,
    addPost
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

  it('Should throw if AddPost throws', async () => {
    const { sut, addPost } = makeSut()
    jest.spyOn(addPost, 'add').mockImplementationOnce(async => {
      throw new Error('any_error')
    })
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })

  it('Should call AddPost with correct values', async () => {
    const { sut, addPost } = makeSut()
    const addSpy = jest.spyOn(addPost, 'add')
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
    expect(httpResponse).toEqual(ok(makeFakePost()))
  })
})
