import { LoadOneAndUpdateCoupon } from '../../Presentation/controllers/updateCoupon/updateCouponController'
import { CouponUpdateValidatorAdapter } from '../../utils/couponValidatorUpdateAdapter'
import { CouponMongoRepository } from '../../Infra/dB/mongoDb/couponRepository/coupon'
import { DbUpdateCoupon } from '../../data/useCases/updateCoupons/dbUpdateCoupon'
import { Controller } from '../../Presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoReposytory } from '../../Infra/dB/mongoDb/logRepository/log'
import { DbLoadOneCoupon } from '../../data/useCases/loadCoupon/dbLoadOneCoupon'

export const makeLoadOneAndUpdateCouponController = (): Controller => {
  const validator = new CouponUpdateValidatorAdapter()
  const couponsMongoRepository = new CouponMongoRepository()
  const loadOneCoupon = new DbLoadOneCoupon(couponsMongoRepository)
  const newcoupon = new DbUpdateCoupon(couponsMongoRepository)
  const coupon = new LoadOneAndUpdateCoupon(loadOneCoupon, newcoupon, validator)
  const logMongoReposytory = new LogMongoReposytory()
  return new LogControllerDecorator(coupon, logMongoReposytory)
}
