import { updateCouponModel } from '../../Domain/useCases/updateCoupon'

export interface CouponValidatorUpdate {
  isValid: (coupon: updateCouponModel) => Promise<boolean>
  validate: (coupon: updateCouponModel) => Promise<updateCouponModel>

}
