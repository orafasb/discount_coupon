import { useValideCouponModel } from '../../Domain/useCases/useValidateCoupon'

export interface CouponValidatorInUse {
  isValid: (coupon: useValideCouponModel, purchaseData: any) => Promise<boolean>
  validate: (coupon: useValideCouponModel, purchaseData: any) => Promise<useValideCouponModel>
}
