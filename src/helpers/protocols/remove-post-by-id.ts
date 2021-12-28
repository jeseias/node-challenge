import { PostModel } from "@/models/posts";

export interface RemovePostById {
  remove(id: string): Promise<PostModel>
}