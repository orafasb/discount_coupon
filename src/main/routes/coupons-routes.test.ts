import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../Infra/dB/mongoDb/helpers/mongoHelper'

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
describe('Coupons Post ', () => {
  it('Should post coupon on success ', async () => {
    await request(app)
      .post('/api/coupon')
      .send({
        name: 'DEZ10',
        code: 'DEZ10',
        discount: 10,
        type: 'percent',
        active: true,
        branches: [{}]
      })
      .expect(200)
  })
})
it('Should post UsedCoupon on success ', async () => {
  await request(app)
    .post('/api/coupon/validid/burned')
    .send({
      items: [],
      createdAt: new Date('2020-10-10')
    })
    .expect(200)
})
describe('Coupons Get/coupons', () => {
  it('Should return coupon on success but no content', async () => {
    await request(app)
      .get('/api/coupon')
      .expect(204)
  })
})
