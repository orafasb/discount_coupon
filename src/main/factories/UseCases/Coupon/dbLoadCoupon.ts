import { DbLoadCoupons } from '../../../../data/useCases/loadCoupon/dbLoadCoupon'
import { loadCoupons } from '../../../../Domain/useCases/loadCoupons'
import { CouponMongoRepository } from '../../../../Infra/dB/mongoDb/couponRepository/coupon'
import { loadOneCoupon } from '../../../../Domain/useCases/loadOneCoupon'
import { DbLoadOneCoupon } from '../../../../data/useCases/loadCoupon/dbLoadOneCoupon'
import { DbDeleteCoupon } from '../../../../data/useCases/deleteCoupon/dbDeleteCoupon'
import { deleteCoupon } from '../../../../Domain/useCases/deleteCoupon'

export const makeDbloadCoupons = (): loadCoupons => {
  const couponsMongoRepository = new CouponMongoRepository()
  return new DbLoadCoupons(couponsMongoRepository)
}
export const makeDbOneloadCoupon = (): loadOneCoupon => {
  const couponsMongoRepository = new CouponMongoRepository()
  return new DbLoadOneCoupon(couponsMongoRepository)
}

export const makeDbOneloadAndDeleteCoupon = (): deleteCoupon => {
  const couponsMongoRepository = new CouponMongoRepository()
  return new DbDeleteCoupon(couponsMongoRepository)
}
