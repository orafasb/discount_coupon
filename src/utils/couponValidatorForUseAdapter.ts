import { CouponValidatorInUse } from '../Presentation/protocols/couponValidatoInUse'
import { CouponNotValid } from '../Presentation/errors/couponNotValidate'
import { useValideCouponModel } from '../Domain/useCases/useValidateCoupon'
import { CouponMongoRepository } from '../Infra/dB/mongoDb/couponRepository/coupon'

export class CouponValidatorForUseAdapter implements CouponValidatorInUse {
  async validate (coupon: useValideCouponModel, purchaseData: any): Promise<useValideCouponModel> {
    if (await this.isValid(coupon, purchaseData)) {
      return coupon
    }
  }

  async isValid (coupon: useValideCouponModel, purchaseData: any): Promise<boolean> {
    if (coupon.useOneById) {
      const search = new CouponMongoRepository()
      const { code } = coupon
      const cpf = purchaseData.user.identity.value
      const resultSearchUsedCoupon = await search.findUsedCoupon(cpf, code)
      if (resultSearchUsedCoupon !== null) {
        throw new CouponNotValid('This coupon is already used')
      }
    }
    if (!coupon.code) {
      throw new CouponNotValid('This code not exist')
    }
    if (!coupon.active) {
      throw new CouponNotValid('Is not active')
    }
    if (coupon.count !== null || coupon.count !== undefined) {
      if (coupon.count <= 0) {
        throw new CouponNotValid('Number of use is over')
      }
    }
    if (coupon.startDate && coupon.endDate) {
      const getDateNow = new Date()
      if (coupon.startDate > getDateNow || coupon.endDate < getDateNow) {
        throw new CouponNotValid('This coupon has expired')
      }
    }
    if (coupon.startDate) {
      const getDateNow = new Date()
      if (coupon.startDate > getDateNow) {
        throw new CouponNotValid('This coupon has expired')
      }
    }
    if (coupon.endDate) {
      const getDateNow = new Date()
      if (coupon.endDate < getDateNow) {
        throw new CouponNotValid('This coupon has expired')
      }
    }
    return true
  }
}
