import { AddCouponModel, CouponModel, AddCouponRepository } from './dbAddCouponProtocols'
import { DbAddCoupon } from './dbAddCoupon'

const makeAddCouponRepository = (): AddCouponRepository => {
  class AddCouponRepositoryStub implements AddCouponRepository {
    async add (couponData: AddCouponModel): Promise<CouponModel> {
      const fakeCoupon = {
        id: 'validId',
        name: 'validCouponName',
        code: 'invalidCode',
        discount: 10,
        type: 'percent',
        active: true
      }
      return await new Promise(resolve => resolve(fakeCoupon))
    }
  }
  return new AddCouponRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addCouponReposituryStub = makeAddCouponRepository()
  const sut = new DbAddCoupon(addCouponReposituryStub)
  return {
    sut,
    addCouponReposituryStub
  }
}
interface SutTypes {
  sut: DbAddCoupon
  addCouponReposituryStub: AddCouponRepository
}
describe('dbAddCoupon', () => {
  it('Should call AddCoupon with correct values', async () => {
    const { sut, addCouponReposituryStub } = makeSut()
    const addSpy = jest.spyOn(addCouponReposituryStub, 'add')
    const couponData = {
      name: 'validCouponName',
      code: 'invalidCode',
      discount: 10,
      type: 'percent',
      active: true
    }
    await sut.add(couponData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'validCouponName',
      code: 'invalidCode',
      discount: 10,
      type: 'percent',
      active: true
    })
  })
  it('Should throw if AddCoupon thorws', async () => {
    const { sut, addCouponReposituryStub } = makeSut()
    jest.spyOn(addCouponReposituryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const couponData = {
      name: 'validCouponName',
      code: 'invalidCode',
      discount: 10,
      type: 'percent',
      active: true
    }
    const promise = sut.add(couponData)
    await expect(promise).rejects.toThrow()
  })
  it('Should return an coupon on success ', async () => {
    const { sut } = makeSut()
    const couponData = {
      name: 'validCouponName',
      code: 'invalidCode',
      discount: 10,
      type: 'percent',
      active: true
    }
    const coupon = await sut.add(couponData)
    expect(coupon).toEqual({
      id: 'validId',
      name: 'validCouponName',
      code: 'invalidCode',
      discount: 10,
      type: 'percent',
      active: true
    })
  })
})
