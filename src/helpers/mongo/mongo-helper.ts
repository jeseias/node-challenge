import { PostModel } from '../../models/posts'
import { MongoClient, Collection } from 'mongodb'

export const map = (post: any): PostModel => {
  const mappedPost = Object.assign(
    {}, {
      id: post._id,
      title: post.title,
      body: post.body,
      tags: post.tags
    })

  return mappedPost
}

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {})
  },

  async disconnect (): Promise<void> {
    if (this.client) await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.uri)
    return this.client.db().collection(name)
  }
}
