import { Options } from 'swagger-jsdoc'
import { basicInformation, apiTags } from './basic-info'
import { createPost, updatePost, deletePost, getPosts, getPost } from './paths'
import { createPostSchema, postSchema, postsSchema } from './schemas/post'
import { badRequest, serverError } from './schemas/errors'

export const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: basicInformation,
    tags: apiTags,
    servers: [
      {
        url: 'http://localhost:3333/api',
        description: 'Development Server'
      }
    ],
    schemas: {
      entities: {
        post: postSchema,
        posts: postsSchema,
        createPost: createPostSchema,
        components: {
          badRequest,
          serverError
        }
      }
    },
    paths: {
      '/posts': { ...createPost, ...getPosts },
      '/posts/{id}': { ...getPost, ...updatePost, ...deletePost }
    }
  },
  apis: ['/api.ts']
}
