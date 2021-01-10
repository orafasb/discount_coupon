import { MongoHelper } from '../Infra/dB/mongoDb/helpers/mongoHelper'
import { CouponMapper } from '../utils/mapperCouponAdapter'

const makeSut = (): CouponMapper => {
  return new CouponMapper()
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
describe('mapperCoupon', () => {
  it('Should be return mapperCoupon', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'mapperCoupon').mockResolvedValue({})
    const httpResponse = {}
    expect(httpResponse).toEqual({})
  })
  it('Should be return mapperCoupon', async () => {
    const sut = makeSut()
    const response = jest.spyOn(sut, 'mapperCoupon').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    await expect(response).rejects.toThrow()
  })
})
