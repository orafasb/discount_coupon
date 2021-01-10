import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  route: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
