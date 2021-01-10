import { AddUsedCouponModel, AddUseCouponRepository, AddUsedCoupon } from './dbResgisterUsedCouponProtocols'

export class DbRegisterUsedCoupon implements AddUsedCoupon {
  private readonly addUseCouponRepository: AddUseCouponRepository
  constructor (addUseCouponRepositoryStub: AddUseCouponRepository) {
    this.addUseCouponRepository = addUseCouponRepositoryStub
  }

  async registerUsedCoupon (useCoupon: AddUsedCouponModel): Promise<AddUsedCouponModel> {
    const coupon = await this.addUseCouponRepository.registerUsedCoupon(useCoupon)
    return coupon
  }
}
