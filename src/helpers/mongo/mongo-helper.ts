import { PostModel } from '@/models/posts'

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
// const posts = await Post.insertMany({
//   _id: uuid(),
//   title,
//   body,
//   tags
// })
// const post = posts[0]
// const mappedPost = MongoHelper.map(post)

// const queryString = Post.find().skip((page - 1) * limit).limit(limit)
// const posts = await queryString
