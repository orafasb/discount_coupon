import { CouponModel } from '../../../Domain/models/coupon'
import { updateCouponModel, updateCoupon } from '../../../Domain/useCases/updateCoupon'
import { UpdateCouponRepository } from '../../protocols/updateCouponRepository'

export class DbUpdateCoupon implements updateCoupon {
  constructor (private readonly updateCouponRepository: UpdateCouponRepository) {
    this.updateCouponRepository = updateCouponRepository
  }

  async update (id: string, data: updateCouponModel): Promise<CouponModel> {
    return await this.updateCouponRepository.update(id, data)
  }
}
