
import { deleteCoupon } from '../../../Domain/useCases/deleteCoupon'
import { DeletCouponRepository } from '../../protocols/deleteCouponRepository'

export class DbDeleteCoupon implements deleteCoupon {
  constructor (private readonly deletCouponRepository: DeletCouponRepository) {}

  async deleteCoupon (id: string): Promise<any> {
    return await this.deletCouponRepository.deleteCoupon(id)
  }
}
