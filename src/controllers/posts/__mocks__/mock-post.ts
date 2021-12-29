import { PostModel } from '../../../models/posts'

export const makeFakePost = (): PostModel => ({
  id: 'any_id',
  title: 'any_title',
  body: 'any_body',
  tags: ['any_tag']
})
