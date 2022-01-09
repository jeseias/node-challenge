import { Request, Response } from 'express'
import { Controller } from '../../controllers/controller-protocols'
import { HttpRequest } from '../../helpers/http/http-protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }

    const httpResponse = await controller.handle(httpRequest)
    if (String(httpResponse.statusCode).startsWith('2')) {
      res
        .status(httpResponse.statusCode)
        .header({
          pagination: {
            page: httpRequest.query.page,
            limit: httpRequest.query.limit
          }
        })
        .json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
    }
  }
}
