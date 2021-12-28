import { PostModel } from "@/models/posts";

export interface LoadPosts {
  loadAll(limit: number, page: number): Promise<PostModel[]>
}