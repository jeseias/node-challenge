import { model, Schema } from 'mongoose'

export interface PostModel {
  id: string
  title: string
  body: string
  tags: string[]
}

export interface AddPostModel {
  title: string
  body: string
  tags: string[]
}

const PostSchema = new Schema({
  _id: {
    type: String,
    required: [true, 'Post id is required']
  },
  title: {
    type: String,
    required: [true, 'Post title is required']
  },
  body: {
    type: String,
    required: [true, 'Post body is required']
  },
  tags: {
    type: [String],
    required: [true, 'Post tags are required']
  }
})

export const Post = model('Post', PostSchema)
