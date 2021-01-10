import { CouponModel } from '../../../Domain/models/coupon'
import { loadOneCoupon } from '../../../Domain/useCases/loadOneCoupon'
import { loadOneCouponRepository } from '../../protocols/loadOneCouponRepository'

export class DbLoadOneCoupon implements loadOneCoupon {
  constructor (private readonly loadOneCouponRepository: loadOneCouponRepository) {}

  async loadOne (id: string): Promise<CouponModel> {
    const coupons = await this.loadOneCouponRepository.findById(id)
    return coupons
  }
}
