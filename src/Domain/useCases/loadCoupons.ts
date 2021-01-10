import { CouponModel } from '../models/coupon'

export interface loadCoupons {
  load: (query?: any) => Promise<CouponModel[]>
}
