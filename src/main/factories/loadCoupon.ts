
import { Controller } from '../../Presentation/protocols/controller'
import { LoadCouponsController } from '../../Presentation/controllers/loadCoupons/loadCouponController'
import { makeDbloadCoupons, makeDbOneloadAndDeleteCoupon, makeDbOneloadCoupon } from './UseCases/Coupon/dbLoadCoupon'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoReposytory } from '../../Infra/dB/mongoDb/logRepository/log'
import { LoadOneCouponController } from '../../Presentation/controllers/loadOneCoupon/loadOneCouponController'
import { LoadOneAndDeleteCoupon } from '../../Presentation/controllers/deleteCoupon/deleteCouponController'

export const makeLoadCouponController = (): Controller => {
  const coupon = new LoadCouponsController(makeDbloadCoupons())
  const logMongoReposytory = new LogMongoReposytory()
  return new LogControllerDecorator(coupon, logMongoReposytory)
}

export const makeLoadOneCouponController = (): Controller => {
  const coupon = new LoadOneCouponController(makeDbOneloadCoupon())
  const logMongoReposytory = new LogMongoReposytory()
  return new LogControllerDecorator(coupon, logMongoReposytory)
}

export const makeLoadOneAndDeleteCouponController = (): Controller => {
  const coupon = new LoadOneAndDeleteCoupon(makeDbOneloadAndDeleteCoupon())
  const logMongoReposytory = new LogMongoReposytory()
  return new LogControllerDecorator(coupon, logMongoReposytory)
}
