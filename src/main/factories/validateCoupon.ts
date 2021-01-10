
import { CouponMongoRepository } from '../../Infra/dB/mongoDb/couponRepository/coupon'
import { Controller } from '../../Presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoReposytory } from '../../Infra/dB/mongoDb/logRepository/log'
import { CouponValidatorForUseAdapter } from '../../utils/couponValidatorForUseAdapter'
import { DbUseCoupon } from '../../data/useCases/useCoupon/dbUseCoupon'
import { UseCouponController } from '../../Presentation/controllers/useCoupon/useCouponController'
import { CouponMapper } from '../../utils/mapperCouponAdapter'

export const makeUseValidCouponController = (): Controller => {
  const couponValidatorAddAdapter = new CouponValidatorForUseAdapter()
  const returnCoupon = new CouponMapper()
  const couponMongoRepository = new CouponMongoRepository()
  const dbAddCoupon = new DbUseCoupon(couponMongoRepository)
  const couponController = new UseCouponController(couponValidatorAddAdapter, dbAddCoupon, returnCoupon)
  const logMongoReposytory = new LogMongoReposytory()
  return new LogControllerDecorator(couponController, logMongoReposytory)
}
