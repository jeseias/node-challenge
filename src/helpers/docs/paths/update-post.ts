import { buildErrorResponse } from '../builders/build-errors'

export const updatePost =
  {
    put: {
      tags: ['Posts'],
      summary: 'end-point to update a post',
      description: 'Update post',
      operationId: 'updatePost',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'id of the post to be updated',
          schema: {
            type: 'string',
            description: 'post id',
            example: 'fe7d57e6-9738-46bc-9029-6d646222c99b'
          }
        }
      ],
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
        200: {
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
