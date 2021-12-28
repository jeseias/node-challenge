import { Schema } from 'swagger-jsdoc'

const schema = {
  title: {
    type: 'string',
    description: 'Post title',
    example: 'Study Mobile Development'
  },
  body: {
    type: 'string',
    description: 'Focus more on swift',
    example: 'Udemy course'
  },
  tags: {
    type: 'array',
    items: 'string',
    description: 'Post tags',
    example: ['SwiftUI', 'Kotlin', 'ReactNative']
  }
}

export const postSchema: Schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Post Identification Number',
      example: 'fe7d57e6-9738-46bc-9029-6d646222c99b'
    },
    ...schema
  }
}

export const postsSchema: Schema = {
  type: 'array',
  items: postSchema
}

export const createPostSchema: Schema = {
  type: 'object',
  properties: {
    ...schema
  }
}
