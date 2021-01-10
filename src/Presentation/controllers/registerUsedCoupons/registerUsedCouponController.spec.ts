import { RegisterUsedCoupon } from './registerUsedCouponController'
import { HttpRequest } from './registerUsedCouponControllerProtocols'
import { AddUsedCoupon, AddUsedCouponModel } from 'Domain/useCases/registerUsedCoupon'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    items: [],
    createdAt: '2020-10-10'
  }
})

const makeRegisterUsedCoupon = (): AddUsedCoupon => {
  class AddUsedCouponStub implements AddUsedCoupon {
    async registerUsedCoupon (usedCoupon: AddUsedCouponModel): Promise<AddUsedCouponModel> {
      const fakeUsedCoupon = {
        items: [],
        createdAt: new Date()
      }
      return await new Promise(resolve => resolve(fakeUsedCoupon))
    }
  }
  return new AddUsedCouponStub()
}
interface SutTypes{
  sut: RegisterUsedCoupon
  addCouponStub: AddUsedCoupon
}
const MakeSut = (): SutTypes => {
  const addCouponStub = makeRegisterUsedCoupon()
  const sut = new RegisterUsedCoupon(addCouponStub)
  return {
    sut,
    addCouponStub
  }
}
describe('RegisterUsedCouponController', () => {
  it('should call AddCoupon witch correct values', async () => {
    const { sut, addCouponStub } = MakeSut()
    const addSpy = jest.spyOn(addCouponStub, 'registerUsedCoupon')
    await sut.route(makeFakeRequest())
    expect(addSpy).toHaveBeenLastCalledWith({
      items: [],
      createdAt: '2020-10-10'
    })
  })
  it('should return 200 if valid data is provided', async () => {
    const { sut } = MakeSut()
    const httpResponse = await sut.route(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(200)
  })
})
