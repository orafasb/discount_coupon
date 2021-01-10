import { AddUseCouponRepository, AddUsedCoupon, AddUsedCouponModel } from './dbResgisterUsedCouponProtocols'
import { DbRegisterUsedCoupon } from './dbRegisterUsedCoupon'

const makeAddCouponRepository = (): AddUseCouponRepository => {
  class AddUseCouponRepositoryStub implements AddUseCouponRepository {
    async registerUsedCoupon (usedCoupon: AddUsedCouponModel): Promise<AddUsedCouponModel> {
      const fakeUsedCoupon = {
        items: [],
        createdAt: new Date()
      }
      return await new Promise(resolve => resolve(fakeUsedCoupon))
    }
  }
  return new AddUseCouponRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addCouponReposituryStub = makeAddCouponRepository()
  const sut = new DbRegisterUsedCoupon(addCouponReposituryStub)
  return {
    sut,
    addCouponReposituryStub
  }
}
interface SutTypes {
  sut: DbRegisterUsedCoupon
  addCouponReposituryStub: AddUsedCoupon
}
describe('dbRegisterUsedCoupon', () => {
  it('Should return register used coupon on success ', async () => {
    const { sut, addCouponReposituryStub } = makeSut()
    const resolved = jest.spyOn(addCouponReposituryStub, 'registerUsedCoupon')
    await sut.registerUsedCoupon({
      items: [],
      createdAt: new Date()
    })
    expect(resolved).toHaveBeenCalled()
  })
  it('Should throw if register used coupon thorws', async () => {
    const { addCouponReposituryStub } = makeSut()
    const errorRegister = jest.spyOn(addCouponReposituryStub, 'registerUsedCoupon').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    await expect(errorRegister).rejects.toThrow()
  })
})
