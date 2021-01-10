import { CouponValidatorAdd } from '../Presentation/protocols/couponValidatorAdd'
import { AddCouponModel } from '../Domain/useCases/addCoupons'
import { ExistCouponError, InvalidParamError, MissingParamError } from '../Presentation/errors'
import { CouponMongoRepository } from '../Infra/dB/mongoDb/couponRepository/coupon'

export class CouponValidatorAddAdapter implements CouponValidatorAdd {
  async validate (coupon: AddCouponModel): Promise<AddCouponModel> {
    if (await this.isValid(coupon)) {
      return coupon
    }
  }

  async isValid (coupon: AddCouponModel): Promise<boolean> {
    const search = new CouponMongoRepository()
    const requiredFields = ['name', 'code', 'type', 'discount', 'active', 'branches']
    for (const filed of requiredFields) {
      if (coupon[filed] === undefined) {
        throw new MissingParamError(filed)
      }
    }
    const { code, active, type, discount, branches } = coupon
    const resultSearch = await search.findByCode(code)
    if (resultSearch) {
      throw new ExistCouponError()
    }
    if (type !== 'fixed' && type !== 'percent') {
      throw new InvalidParamError('TYPE : Just type percent or fixed')
    }
    if (typeof active !== 'boolean') {
      throw new InvalidParamError('ACTIVE: Just accept true or false')
    }
    if (typeof discount !== 'number') {
      throw new InvalidParamError('DISCOUNT : Only accept one number')
    }
    if (branches.length === 0) {
      throw new InvalidParamError('Branches : Need at least one entry')
    }
    if (discount <= 0) {
      throw new InvalidParamError('DISCOUNT : The value cannot be zero or negative ')
    }
    return true
  }
}
