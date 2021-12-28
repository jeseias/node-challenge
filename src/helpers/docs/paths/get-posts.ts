export const getPosts =
  {
    get: {
      tags: ['Posts'],
      summary: 'end-point to get all posts',
      description: 'Get post',
      operationId: 'getPosts',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: `
            limit query param is used to limit the amount of documents that should be returned by the server. Used together with the page query param 
            for pagination. So you can determine the amount of documents per page. If this parameter is not sent, it will default to 3.
          `,
          schema: {
            type: 'string',
            description: 'server will return only 3 documents',
            example: '3'
          }
        },
        {
          name: 'page',
          in: 'query',
          description: `
            page query param is used to determine which group of documents should be return by the server
          `,
          schema: {
            type: 'string',
            description: 'server will page 2 documents only',
            example: '2'
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
