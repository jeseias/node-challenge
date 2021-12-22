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
