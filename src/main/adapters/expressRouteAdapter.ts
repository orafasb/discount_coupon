import { Controller, HttpRequest } from '../../Presentation/protocols'
import { Request, Response } from 'express'

export const adaptRout = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      params: req.params,
      url: req.url,
      query: req.query
    }
    const httpResponse = await controller.route(httpRequest)
    if (httpResponse.statusCode >= 200 || httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
