import { AddPostModel, PostModel } from '@/models/posts'

export interface AddPost {
  add(addPostModel: AddPostModel): Promise<PostModel>
}
