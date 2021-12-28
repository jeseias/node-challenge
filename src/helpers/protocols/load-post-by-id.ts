import { PostModel } from "../../models/posts";

export interface LoadPostById {
  loadOne(id: string): Promise<PostModel>
}