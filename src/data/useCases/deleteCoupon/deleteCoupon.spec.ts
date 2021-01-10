
import { DeletCouponRepository } from '../../protocols/deleteCouponRepository'
import { DbDeleteCoupon } from '../deleteCoupon/dbDeleteCoupon'

const makeUpdadteCouponRepository = (): DeletCouponRepository => {
  class DeletCouponRepositoryStub implements DeletCouponRepository {
    async deleteCoupon (id: string): Promise<any> {
      const fakeCoupon = {
        id: 'validId',
        name: 'validCouponName',
        code: 'invalidCode',
        discount: 10,
        type: 'percent',
        active: true,
        count: 10,
        startDate: '2020/10/10',
        endDate: '2021/10/10',
        branches: ['dasdasdad']
      }
      return await new Promise(resolve => resolve(fakeCoupon)).then()
    }
  }
  return new DeletCouponRepositoryStub()
}

const makeSut = (): SutTypes => {
  const deletCouponRepositoryStub = makeUpdadteCouponRepository()
  const sut = new DbDeleteCoupon(deletCouponRepositoryStub)
  return {
    sut,
    deletCouponRepositoryStub
  }
}
interface SutTypes {
  sut: DbDeleteCoupon
  deletCouponRepositoryStub: DeletCouponRepository
}
describe('DbUpdateCouponResult', () => {
  it('Should call UpdateCouponResultRepository with correct values', async () => {
    const { sut, deletCouponRepositoryStub } = makeSut()
    const deletSpy = jest.spyOn(deletCouponRepositoryStub, 'deleteCoupon')

    await sut.deleteCoupon('validId')
    expect(deletSpy).toHaveBeenCalled()
  })
})
