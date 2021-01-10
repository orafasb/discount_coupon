import { AddCouponModel } from '../../Domain/useCases/addCoupons'

export interface CouponValidatorAdd {
  isValid: (coupon: AddCouponModel) => Promise<boolean>
  validate: (coupon: AddCouponModel) => Promise<AddCouponModel>

}
