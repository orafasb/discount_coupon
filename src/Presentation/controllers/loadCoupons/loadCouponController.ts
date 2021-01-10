import { Controller, HttpRequest, HttpResponse, loadCoupons } from './loadCouponsControllerProtocols'
import { ok, serverError, noContent } from '../../helpers/httpHelper'

export class LoadCouponsController implements Controller {
  constructor (private readonly loadCoupons: loadCoupons) {

  }

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const coupons = await this.loadCoupons.load(httpRequest.query)
      return coupons.length ? ok(coupons) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
