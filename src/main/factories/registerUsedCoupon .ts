import { CouponMongoRepository } from '../../Infra/dB/mongoDb/couponRepository/coupon'
import { Controller } from '../../Presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoReposytory } from '../../Infra/dB/mongoDb/logRepository/log'
import { DbRegisterUsedCoupon } from '../../data/useCases/registerUsedCoupon/dbRegisterUsedCoupon'
import { RegisterUsedCoupon } from '../../Presentation/controllers/registerUsedCoupons/registerUsedCouponController'

export const makeRegisterUsedCouponController = (): Controller => {
  const couponMongoRepository = new CouponMongoRepository()
  const dbRegisterUsedCoupons = new DbRegisterUsedCoupon(couponMongoRepository)
  const couponController = new RegisterUsedCoupon(dbRegisterUsedCoupons)
  const logMongoReposytory = new LogMongoReposytory()
  return new LogControllerDecorator(couponController, logMongoReposytory)
}
