import { AddUsedCouponModel } from '../../Domain/useCases/registerUsedCoupon'

export interface AddUseCouponRepository{
  registerUsedCoupon: (usedCoupon: AddUsedCouponModel) => Promise<AddUsedCouponModel>
}
