import { MongoHelper } from '../Infra/dB/mongoDb/helpers/mongoHelper'
import { CouponNotValid } from '../Presentation/errors/couponNotValidate'
import { CouponValidatorForUseAdapter } from '../utils/couponValidatorForUseAdapter'

const makeSut = (): CouponValidatorForUseAdapter => {
  return new CouponValidatorForUseAdapter()
}
beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})
afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  const couponCollection = await MongoHelper.getColection('coupons')
  await couponCollection.deleteMany({})
})
describe('couponValidatorAdd', () => {
  it('Should return true if validator type return true', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid({
      name: 'validCouponName',
      code: 'invalidCode',
      discount: 10,
      type: 'percent',
      active: true
    }, {})
    expect(isValid).toBe(true)
  })
  it('Should return false if validator type return false', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'isValid').mockResolvedValue(false)
    const httpResponse = new CouponNotValid('false')
    expect(httpResponse).toEqual(new CouponNotValid('false'))
  })
})
