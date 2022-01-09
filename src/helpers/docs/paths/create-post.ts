import { Paths } from 'swagger-jsdoc'
import { buildErrorResponse } from '../builders/build-errors'

export const createPost: Paths =
  {
    post: {
      tags: ['Posts'],
      summary: 'end-point to create a new post',
      description: 'Create post',
      operationId: 'createPost',
      requestBody: {
        required: true,
        content: {
          'application/json:': {
            schema: {
              $ref: '#schemas/entities/createPost'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Success',
          content: {
            'application/json:': {
              schema: {
                $ref: '#schemas/entities/post'
              }
            }
          }
        },
        400: {
          description: 'bad request',
          content: {
            'application/json:': {
              schema: buildErrorResponse('MissingParamError: title')
            }
          }
        },
        500: {
          description: 'server error',
          content: {
            'application/json:': {
              schema: {
                $ref: '#schemas/entities/components/serverError'
              }
            }
          }
        }
      }
    }
  }
