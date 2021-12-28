import { Schema } from 'swagger-jsdoc'

export const buildErrorResponse = (errorMessage: string): Schema => ({
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'Bad Request Error message',
      example: errorMessage
    }
  }
})
