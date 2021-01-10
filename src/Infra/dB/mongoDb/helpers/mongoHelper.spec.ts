import { MongoHelper as sut } from './mongoHelper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  it('Should reconect is mongodb is down ', async () => {
    let couponsCollection = await sut.getColection('coupons')
    expect(couponsCollection).toBeTruthy()
    await sut.disconnect()
    couponsCollection = await sut.getColection('coupons')
    expect(couponsCollection).toBeTruthy()
  })
})
