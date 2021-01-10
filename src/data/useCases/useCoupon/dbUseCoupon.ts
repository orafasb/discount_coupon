import { LoadValideCouponRepository } from '../../protocols/useCouponRepository'
import { loadValidCoupon } from '../../../Domain/useCases/useValidateCoupon'
import { CouponModel } from '../../../Domain/models/coupon'

export class DbUseCoupon implements loadValidCoupon {
  constructor (private readonly loadValideCouponRepository: LoadValideCouponRepository) {}

  async findByCode (code: string): Promise<CouponModel> {
    const coupons = await this.loadValideCouponRepository.findByCode(code)

    return coupons
  }
}
