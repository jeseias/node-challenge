import { PostModel } from "@/models/posts";

export interface LoadPostById {
  load(id: string): Promise<PostModel>
}