import { CouponModel } from '../../Domain/models/coupon'
import { updateCouponModel } from '../../Domain/useCases/updateCoupon'

export interface UpdateCouponRepository {
  update: (id: string, coupon: updateCouponModel) => Promise<CouponModel>
}
