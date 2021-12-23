import { MissingParamError } from '../../helpers/errors/missing-param-error'
import { badRequest } from '../../helpers/http/http-helpers'
import { AddPostController } from './add-post-controller'

// const makeFakePost = (): PostModel => ({
//   id: 'valid_id',
//   title: 'valid_title',
//   body: 'valid_body',
//   tags: ['valid_tag']
// })

// const makeFakeHttpRequest = (): HttpRequest => ({
//   body: {
//     title: 'any_title',
//     body: 'any_body',
//     tags: ['any_tag']
//   }
// })

const makeSut = (): AddPostController => {
  return new AddPostController()
}

describe('AddPostController', () => {
  it('should return a MissingParamError if title is not provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        body: 'any_body',
        tags: ['any_tag']
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
  })
  it('should return a MissingParamError if tags is not provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        body: 'any_body',
        title: 'any_title'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('tags')))
  })
  it('should return a MissingParamError if body is not provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        title: 'any_title',
        tags: ['any_tag']
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('body')))
  })
})
