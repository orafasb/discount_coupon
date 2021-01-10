import { InvalidParamError } from '../Presentation/errors'
import { CouponValidatorUpdate } from '../Presentation/protocols/couponValidatorUpdate'
import { updateCouponModel } from '../Domain/useCases/updateCoupon'

export class CouponUpdateValidatorAdapter implements CouponValidatorUpdate {
  async validate (coupon: updateCouponModel): Promise<updateCouponModel> {
    if (await this.isValid(coupon)) {
      return coupon
    }
  }

  async isValid (coupon: updateCouponModel): Promise<boolean> {
    const { active, type, discount } = coupon

    if (type !== 'fixed' && type !== 'percent') {
      throw new InvalidParamError('TYPE : Just type percent or fixed')
    }
    if (typeof active !== 'boolean') {
      throw new InvalidParamError('ACTIVE: Just accept true or false')
    }
    if (typeof discount !== 'number') {
      throw new InvalidParamError('DISCOUNT : Only accept one number')
    }
    if (discount <= 0) {
      throw new InvalidParamError('DISCOUNT : The value cannot be zero or negative ')
    }

    return true
  }
}
