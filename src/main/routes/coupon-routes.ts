import { Router } from 'express'
import { makeCouponController } from '../factories/creatCoupon'
import { makeRegisterUsedCouponController } from '../factories/registerUsedCoupon '
import { adaptRout } from '../adapters/expressRouteAdapter'
import { makeLoadCouponController, makeLoadOneAndDeleteCouponController, makeLoadOneCouponController } from '../factories/loadCoupon'
import { makeLoadOneAndUpdateCouponController } from '../factories/updateCoupons'
import { makeUseValidCouponController } from '../factories/validateCoupon'

export default (router: Router): void => {
  const prefix = '/coupon'
  router.post(`${prefix}/`, adaptRout(makeCouponController()))
  router.post(`${prefix}/:id/burned`, adaptRout(makeRegisterUsedCouponController()))
  router.get(`${prefix}/`, adaptRout(makeLoadCouponController()))
  router.get(`${prefix}/:id`, adaptRout(makeLoadOneCouponController()))
  router.post(`${prefix}/validate/:code`, adaptRout(makeUseValidCouponController()))
  router.put(`${prefix}/:id`, adaptRout(makeLoadOneAndUpdateCouponController()))
  router.delete(`${prefix}/:id`, adaptRout(makeLoadOneAndDeleteCouponController()))
}
