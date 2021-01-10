import { CouponModel } from '../models/coupon'

export interface loadOneCoupon {
  loadOne: (id: string) => Promise<CouponModel>
}
