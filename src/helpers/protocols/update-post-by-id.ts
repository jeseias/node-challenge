import { AddPostModel, PostModel } from "@/models/posts";

export interface UpdatePostById {
  update(id: string, data: AddPostModel): Promise<PostModel>
}