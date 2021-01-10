import { Controller, HttpRequest, HttpResponse } from '../../protocols/index'
import { serverError, ok, badRequest } from '../../helpers/httpHelper'
import { updateCoupon } from '../../../Domain/useCases/updateCoupon'
import { loadOneCoupon } from '../../../Domain/useCases/loadOneCoupon'
import { CouponValidatorUpdate } from '../../protocols/couponValidatorUpdate'
import { ExistCouponError, InvalidParamError, MissingParamError } from '../../errors'

export class LoadOneAndUpdateCoupon implements Controller {
  constructor (
    private readonly loadOneCoupon: loadOneCoupon,
    private readonly updateCoupon: updateCoupon,
    private readonly validator: CouponValidatorUpdate) {}

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      const coupon = await this.loadOneCoupon.loadOne(id)
      const couponValidated = await this.validator.validate(httpRequest.body)
      const newCouponResult = await this.updateCoupon.update(id, {
        name: coupon.name = couponValidated.name,
        discount: coupon.discount = couponValidated.discount,
        type: coupon.type = couponValidated.type,
        active: coupon.active = couponValidated.active,
        count: coupon.count = couponValidated.count,
        startDate: coupon.startDate = couponValidated.startDate,
        endDate: coupon.endDate = couponValidated.endDate,
        useOneById: coupon.useOneById = couponValidated.useOneById,
        description: coupon.description = couponValidated.description,
        branches: coupon.branches = couponValidated.branches,
        updatedAt: coupon.updatedAt = couponValidated.updatedAt
      })

      return ok(newCouponResult)
    } catch (error) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof ExistCouponError) {
        const typeOfError = { error: error.message }
        return badRequest(typeOfError)
      }
      return serverError(error)
    }
  }
}
