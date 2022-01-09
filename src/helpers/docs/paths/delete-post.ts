import { buildErrorResponse } from '../builders/build-errors'

export const deletePost =
{
  delete: {
    tags: ['Posts'],
    summary: 'end-point to delete a post',
    description: 'Delete post',
    operationId: 'deletePost',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'id of the post to be deleted',
        schema: {
          type: 'string',
          description: 'post id',
          example: 'fe7d57e6-9738-46bc-9029-6d646222c99b'
        }
      }
    ],
    responses: {
      202: {
        description: 'Success',
        content: {
          'application/json:': {
            schema: {
              type: 'string',
              example: 'deleted successfully'
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
