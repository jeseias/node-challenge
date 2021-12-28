import { buildErrorResponse } from '../builders/build-errors'

export const getPost =
  {
    get: {
      tags: ['Posts'],
      summary: 'end-point to get one post',
      description: 'Get post',
      operationId: 'getPost',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'id used to get an individual post',
          schema: {
            type: 'string',
            description: 'post id',
            example: 'fe7d57e6-9738-46bc-9029-6d646222c99b'
          }
        }
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json:': {
              schema: {
                $ref: '#schemas/entities/posts'
              }
            }
          }
        },
        400: {
          description: 'Bad Request',
          content: {
            'application/json:': {
              schema: buildErrorResponse('Document with this ID not found')
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
