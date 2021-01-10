import { Controller, HttpRequest, HttpResponse } from './loadOneCouponsControllerProtocols'
import { ok, serverError, noContent } from '../../helpers/httpHelper'
import { loadOneCoupon } from '../../../Domain/useCases/loadOneCoupon'

export class LoadOneCouponController implements Controller {
  constructor (private readonly loadOneCoupon: loadOneCoupon) {}

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      const coupons = await this.loadOneCoupon.loadOne(id)
      return coupons ? ok(coupons) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
