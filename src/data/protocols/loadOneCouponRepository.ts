
import { CouponModel } from '../../Domain/models/coupon'

export interface loadOneCouponRepository{
  findById: (id: string) => Promise<CouponModel>
}
