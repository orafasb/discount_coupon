
import { CouponModel } from '../../Domain/models/coupon'

export interface loadCouponsRepository{
  loadAll: (query?: any) => Promise<CouponModel[]>
}
