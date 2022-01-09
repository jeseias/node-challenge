import { ok } from '../../../helpers/http/http-helpers'
import { HttpRequest } from '../../../helpers/http/http-protocols'
import { PostModel } from '../../../models/posts'
import { makeFakePost } from '../__mocks__/mock-post'
import { GetPostsController } from './get-posts-controller'
import { LoadPosts } from '../../../helpers/protocols/load-posts'

const makeFakeHttpRequest = (): HttpRequest => ({
  query: { page: 2, limit: 2 }
})

const makeLoadPosts = (): LoadPosts => {
  class LoadPostsSpy implements LoadPosts {
    async loadAll (limit: number, page: number): Promise<PostModel[]> {
      return [makeFakePost()]
    }
  }

  return new LoadPostsSpy()
}

interface SutTypes {
  sut: GetPostsController
  loadPostsSpy: LoadPosts
}

const makeSut = (): SutTypes => {
  const loadPostsSpy = makeLoadPosts()
  const sut = new GetPostsController(loadPostsSpy)
  return {
    sut,
    loadPostsSpy
  }
}

describe('GetPostsController', () => {
  it('Should call LoadPosts with correct values', async () => {
    const { sut, loadPostsSpy } = makeSut()
    const loadSpy = jest.spyOn(loadPostsSpy, 'loadAll')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith(2, 2)
  })

  it('Should default limit to 3 and page to 1 if they are not provided', async () => {
    const { sut, loadPostsSpy } = makeSut()
    const loadSpy = jest.spyOn(loadPostsSpy, 'loadAll')
    await sut.handle({ query: { } })
    expect(loadSpy).toHaveBeenCalledWith(3, 1)
  })

  it('Should call an array of Post on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok({
      length: 1,
      pagination: {
        page: 2, limit: 2
      },
      data: [makeFakePost()]
    }))
  })
})
