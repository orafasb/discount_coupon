import { useValideCouponModel } from '../../Domain/useCases/useValidateCoupon'

export interface MapperCoupon {
  mapperCoupon: (coupon: useValideCouponModel, purchaseData: any) => Promise<any>

}
