import { AddCouponModel } from '../../Domain/useCases/addCoupons'
import { CouponModel } from '../../Domain/models/coupon'

export interface AddCouponRepository{
  add: (couponData: AddCouponModel) => Promise<CouponModel>
}
