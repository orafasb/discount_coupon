import { Controller, HttpRequest, HttpResponse, AddUsedCoupon } from './registerUsedCouponControllerProtocols'
import { MissingParamError, InvalidParamError, ExistCouponError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/httpHelper'

export class RegisterUsedCoupon implements Controller {
  private readonly addUsedCoupon: AddUsedCoupon
  constructor (addUsedCoupon: AddUsedCoupon) {
    this.addUsedCoupon = addUsedCoupon
  }

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const couponused = httpRequest.body
      const registerUsed = await this.addUsedCoupon.registerUsedCoupon(couponused)
      return ok(registerUsed)
    } catch (error) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof ExistCouponError) {
        const typeOfError = { error: error.message }
        return badRequest(typeOfError)
      }
      return serverError(error)
    }
  }
}
