import { UpdateCouponRepository } from '../../../data/protocols/updateCouponRepository'
import { DbUpdateCoupon } from '../../../data/useCases/updateCoupons/dbUpdateCoupon'
import { CouponModel } from '../../../Domain/models/coupon'
import { updateCouponModel } from '../../../Domain/useCases/updateCoupon'

const makeUpdadteCouponRepository = (): UpdateCouponRepository => {
  class UpdateCouponResultRepositoryStub implements UpdateCouponRepository {
    async update (id: string, data: updateCouponModel): Promise<CouponModel> {
      const fakeCoupon = {
        id: 'validId',
        name: 'validCouponName',
        code: 'invalidCode',
        discount: 10,
        type: 'percent',
        active: true,
        count: 10,
        useOneById: true,
        description: 'anyDescription',
        branches: []
      }

      return await new Promise(resolve => resolve(fakeCoupon)).then()
    }
  }
  return new UpdateCouponResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const updateCouponResultReposituryStub = makeUpdadteCouponRepository()
  const sut = new DbUpdateCoupon(updateCouponResultReposituryStub)
  return {
    sut,
    updateCouponResultReposituryStub
  }
}
interface SutTypes {
  sut: DbUpdateCoupon
  updateCouponResultReposituryStub: UpdateCouponRepository
}
describe('DbUpdateCouponResult', () => {
  it('Should call UpdateCouponResultRepository with correct values', async () => {
    const { sut, updateCouponResultReposituryStub } = makeSut()
    const updateSpy = jest.spyOn(updateCouponResultReposituryStub, 'update')
    const id = 'validId'
    const couponData = {
      name: 'validCouponName',
      code: 'ValidCOde',
      discount: 10,
      type: 'percent',
      active: true,
      count: 100,
      useOneById: true,
      description: 'anyDescription',
      branches: []
    }
    await sut.update(id, couponData)
    expect(updateSpy).toHaveBeenCalledWith(id, {
      name: 'validCouponName',
      code: 'ValidCOde',
      discount: 10,
      type: 'percent',
      active: true,
      count: 100,
      useOneById: true,
      description: 'anyDescription',
      branches: []
    })
  })
})
