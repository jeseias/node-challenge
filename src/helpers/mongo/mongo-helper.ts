import { PostModel } from '../../models/posts'

export const map = (post: any): PostModel => {
  const mappedPost = Object.assign(
    {}, {
      id: post._id,
      title: post.title,
      body: post.body,
      tags: post.tags
    })

  return mappedPost
}
