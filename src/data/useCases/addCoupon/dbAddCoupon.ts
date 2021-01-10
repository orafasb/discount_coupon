import { AddCoupon, AddCouponModel, CouponModel, AddCouponRepository } from './dbAddCouponProtocols'

export class DbAddCoupon implements AddCoupon {
  private readonly addCouponReposituryStub: AddCouponRepository
  constructor (addCouponReposituryStub: AddCouponRepository) {
    this.addCouponReposituryStub = addCouponReposituryStub
  }

  async add (couponData: AddCouponModel): Promise<CouponModel> {
    const coupon = await this.addCouponReposituryStub.add(couponData)
    return coupon
  }
}
