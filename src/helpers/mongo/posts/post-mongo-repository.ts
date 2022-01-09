import { AddPost } from '../../protocols/add-post'
import { LoadPostById } from '../../protocols/load-post-by-id'
import { RemovePostById } from '../../protocols/remove-post-by-id'
import { UpdatePostById } from '../../protocols/update-post-by-id'
import { LoadPosts } from '../../protocols/load-posts'
import { AddPostModel, PostModel, Post } from '../../../models/posts'
import { v4 as uuid } from 'uuid'
import { map } from '../mongo-helper'

export class PostMongoRepository implements AddPost, LoadPosts, LoadPostById, UpdatePostById, RemovePostById {
  async add (addPostModel: AddPostModel): Promise<PostModel> {
    const { title, body, tags } = addPostModel
    const posts = await Post.insertMany({
      _id: uuid(),
      title,
      body,
      tags
    })
    const post = posts[0]
    return map(post)
  }

  async loadOne (id: string): Promise<PostModel> {
    const post = await Post.findById({ _id: id })
    return map(post)
  }

  async loadAll (limit: number, page: number): Promise<PostModel[]> {
    const queryString = Post.find().skip((page - 1) * limit).limit(limit)
    const posts = await queryString
    return posts.map(post => map(post))
  }

  async update (id: string, data: AddPostModel): Promise<PostModel> {
    const { title, body, tags } = data
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title, body, tags
      },
      { new: true }
    )
    return map(post)
  }

  async remove (id: string): Promise<PostModel> {
    const post = await Post.findByIdAndRemove(
      { _id: id },
      { new: true }
    )
    return map(post)
  }
}
