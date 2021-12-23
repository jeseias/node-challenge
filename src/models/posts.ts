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
  _id: String,
  title: String,
  body: String,
  tags: [String]
})

export const Post = model('Post', PostSchema)
