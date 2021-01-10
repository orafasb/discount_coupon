import { Controller, HttpRequest, HttpResponse } from '../../controllers/coupons/couponsProtocols'
import { serverError, success } from '../../helpers/httpHelper'
import { deleteCoupon } from '../../../Domain/useCases/deleteCoupon'

export class LoadOneAndDeleteCoupon implements Controller {
  constructor (private readonly deleteCoupon: deleteCoupon) {

  }

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      await this.deleteCoupon.deleteCoupon(id)
      return success(id)
    } catch (error) {
      return serverError(error)
    }
  }
}
