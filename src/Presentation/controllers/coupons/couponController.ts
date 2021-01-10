import { Controller, CouponValidatorAdd, HttpRequest, HttpResponse, AddCoupon } from './couponsProtocols'
import { MissingParamError, InvalidParamError, ExistCouponError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/httpHelper'

export class CouponController implements Controller {
  private readonly couponValidator: CouponValidatorAdd
  private readonly addCoupon: AddCoupon
  constructor (couponValidator: CouponValidatorAdd, addCoupon: AddCoupon) {
    this.couponValidator = couponValidator
    this.addCoupon = addCoupon
  }

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const couponValidated = await this.couponValidator.validate(httpRequest.body)
      const couponCreat = await this.addCoupon.add(couponValidated)
      return ok(couponCreat)
    } catch (error) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof ExistCouponError) {
        const typeOfError = { error: error.message }
        return badRequest(typeOfError)
      }
      return serverError(error)
    }
  }
}
