import { CouponModel } from '../../../Domain/models/coupon'
import { loadCoupons } from '../../../Domain/useCases/loadCoupons'
import { loadCouponsRepository } from '../../protocols/loadCouponRepository'

export class DbLoadCoupons implements loadCoupons {
  constructor (private readonly loadCouponsRepository: loadCouponsRepository) {}

  async load (query?: any): Promise<CouponModel[]> {
    const coupons = await this.loadCouponsRepository.loadAll(query)
    return coupons
  }
}
