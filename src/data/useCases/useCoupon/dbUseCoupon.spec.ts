import { CouponModel } from '../../../Domain/models/coupon'
import { LoadValideCouponRepository } from '../../protocols/useCouponRepository'
import { DbUseCoupon } from './dbUseCoupon'

const makeUseCouponRepository = (): LoadValideCouponRepository => {
  class LoadValideCouponRepositoryStub implements LoadValideCouponRepository {
    async findByCode (code: string): Promise<CouponModel> {
      const fakeCoupon = {
        id: 'validId',
        name: 'validCouponName',
        code: 'validCode',
        discount: 10,
        type: 'percent',
        active: true,
        count: 10,
        useOneById: true,
        description: 'AnyDdescription'
      }

      return await new Promise(resolve => resolve(fakeCoupon)).then()
    }
  }
  return new LoadValideCouponRepositoryStub()
}

const makeSut = (): SutTypes => {
  const updateCouponResultReposituryStub = makeUseCouponRepository()
  const sut = new DbUseCoupon(updateCouponResultReposituryStub)
  return {
    sut,
    updateCouponResultReposituryStub
  }
}
interface SutTypes {
  sut: DbUseCoupon
  updateCouponResultReposituryStub: LoadValideCouponRepository
}
describe('DbUseCoupons', () => {
  it('Should call UseCouponRepository with correct values', async () => {
    const { sut, updateCouponResultReposituryStub } = makeSut()
    const updateSpy = jest.spyOn(updateCouponResultReposituryStub, 'findByCode')
    const code = 'validCode'
    await sut.findByCode(code)
    expect(updateSpy).toHaveBeenCalledWith('validCode')
  })
})
