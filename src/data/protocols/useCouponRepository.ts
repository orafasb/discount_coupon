import { CouponModel } from '../../Domain/models/coupon'

export interface LoadValideCouponRepository {
  findByCode: (code: string) => Promise<CouponModel>
}
