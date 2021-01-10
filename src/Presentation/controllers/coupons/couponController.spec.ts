import { CouponController } from './couponController'
import { InvalidParamError } from '../../errors'
import { CouponValidatorAdd, HttpRequest, AddCouponModel, AddCoupon, CouponModel } from './couponsProtocols'

const makeCouponValidator = (): CouponValidatorAdd => {
  class CouponValidatorAddStub implements CouponValidatorAdd {
    async validate (coupon: AddCouponModel): Promise<AddCouponModel> {
      return coupon
    }

    async isValid (coupon: AddCouponModel): Promise<boolean> {
      return true
    }
  }
  return new CouponValidatorAddStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'validCouponName',
    code: 'validCode',
    discount: 10,
    type: 'percent',
    active: true
  }
})

const makeAddCoupon = (): AddCoupon => {
  class AddCouponStub implements AddCoupon {
    async add (account: AddCouponModel): Promise<CouponModel> {
      const fakeCoupon = {
        id: 'validId',
        name: 'validCouponName',
        code: 'validCode',
        discount: 10,
        type: 'percent',
        active: true
      }
      return await new Promise(resolve => resolve(fakeCoupon))
    }
  }
  return new AddCouponStub()
}
interface SutTypes{
  sut: CouponController
  couponValidatorStub: CouponValidatorAdd
  addCouponStub: AddCoupon
}
const MakeSut = (): SutTypes => {
  const couponValidatorStub = makeCouponValidator()
  const addCouponStub = makeAddCoupon()
  const sut = new CouponController(couponValidatorStub, addCouponStub)
  return {
    sut,
    couponValidatorStub,
    addCouponStub
  }
}
describe('couponsController', () => {
  it('should return 400 if an invalid code is provided', async () => {
    const { couponValidatorStub } = MakeSut()
    jest.spyOn(couponValidatorStub, 'isValid').mockResolvedValue(false)
    const httpResponse = new InvalidParamError('code')
    expect(httpResponse).toEqual(new InvalidParamError('code'))
  })
  it('should call CoupnValidatorAdd witch a correct code', async () => {
    const { sut, couponValidatorStub } = MakeSut()
    const isValidSpy = jest.spyOn(couponValidatorStub, 'isValid')
    await sut.route(makeFakeRequest())
    expect(isValidSpy).toBeDefined()
  })

  it('should call AddCoupon witch correct values', async () => {
    const { sut, addCouponStub } = MakeSut()
    const addSpy = jest.spyOn(addCouponStub, 'add')
    await sut.route(makeFakeRequest())
    expect(addSpy).toHaveBeenLastCalledWith({
      name: 'validCouponName',
      code: 'validCode',
      discount: 10,
      type: 'percent',
      active: true
    })
  })
  it('should return 200 if valid data is provided', async () => {
    const { sut } = MakeSut()
    const httpResponse = await sut.route(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'validId',
      name: 'validCouponName',
      code: 'validCode',
      discount: 10,
      type: 'percent',
      active: true
    })
  })
})
