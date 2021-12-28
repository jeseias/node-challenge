import { PostModel } from "@/models/posts";

export interface LoadPosts {
  load(limit: number, page: number): Promise<PostModel[]>
}