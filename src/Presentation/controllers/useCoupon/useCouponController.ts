import { Controller, HttpRequest, HttpResponse } from './useCouponsProtocols'
import { serverError, couponIsValid, couponIsNotValid } from '../../helpers/httpHelper'
import { CouponValidatorInUse } from '../../protocols/couponValidatoInUse'
import { CouponNotValid } from '../../errors/couponNotValidate'
import { loadValidCoupon } from '../../../Domain/useCases/useValidateCoupon'
import { CouponMapper } from '../../..//utils/mapperCouponAdapter'

export class UseCouponController implements Controller {
  constructor (private readonly couponValidatorInUse: CouponValidatorInUse, private readonly loadValidCoupon: loadValidCoupon, private readonly couponMapper: CouponMapper) {
  }

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const code = httpRequest.params.code
      const purchaseData = httpRequest.body
      const coupons = await this.loadValidCoupon.findByCode(code)
      const couponValidate = await this.couponValidatorInUse.validate(coupons, purchaseData)
      const returnDescountCoupon = await this.couponMapper.mapperCoupon(couponValidate, purchaseData)
      if (couponValidate) return couponIsValid(returnDescountCoupon)
    } catch (error) {
      if (error instanceof CouponNotValid) {
        const reason = error.message
        return couponIsNotValid({ reason })
      }
      return serverError(error)
    }
  }
}
