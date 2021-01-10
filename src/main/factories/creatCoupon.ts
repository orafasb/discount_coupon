import { CouponController } from '../../Presentation/controllers/coupons/couponController'
import { CouponValidatorAddAdapter } from '../../utils/couponValidatorAddAdapter'
import { DbAddCoupon } from '../../data/useCases/addCoupon/dbAddCoupon'
import { CouponMongoRepository } from '../../Infra/dB/mongoDb/couponRepository/coupon'
import { Controller } from '../../Presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoReposytory } from '../../Infra/dB/mongoDb/logRepository/log'

export const makeCouponController = (): Controller => {
  const couponValidatorAddAdapter = new CouponValidatorAddAdapter()
  const couponMongoRepository = new CouponMongoRepository()
  const dbAddCoupon = new DbAddCoupon(couponMongoRepository)
  const couponController = new CouponController(couponValidatorAddAdapter, dbAddCoupon)
  const logMongoReposytory = new LogMongoReposytory()
  return new LogControllerDecorator(couponController, logMongoReposytory)
}
