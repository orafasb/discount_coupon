import { CouponModel } from '../../../Domain/models/coupon'
import { LoadOneCouponController } from './loadOneCouponController'
import { loadOneCoupon } from '../../../Domain/useCases/loadOneCoupon'

describe('Load Coupon Controller', () => {
  interface SutTypes {
    sut: LoadOneCouponController
    loadCouponsStub: loadOneCoupon
  }
  const makeLoadCoupons = (): loadOneCoupon => {
    class LoadOneCouponStub implements loadOneCoupon {
      async loadOne (id: string): Promise<CouponModel> {
        return await new Promise(resolve => resolve(makeFakeCoupons()))
      }
    }

    return new LoadOneCouponStub()
  }

  const makeSut = (): SutTypes => {
    const loadCouponsStub = makeLoadCoupons()
    const sut = new LoadOneCouponController(loadCouponsStub)
    return {
      sut,
      loadCouponsStub
    }
  }
  const makeFakeCoupons = (): CouponModel => {
    return {
      id: 'validId',
      name: 'validCouponName',
      code: 'validCode',
      discount: 10,
      type: 'percent',
      active: true
    }
  }
  test('Should returned 200 on success', async () => {
    const { loadCouponsStub } = makeSut()
    const coupom = await loadCouponsStub.loadOne(makeFakeCoupons().id)
    expect(coupom.id).toBe(makeFakeCoupons().id)
  })
})
