import { MongoHelper } from '../helpers/mongoHelper'
import { CouponMongoRepository } from './coupon'

const makeSut = (): CouponMongoRepository => {
  return new CouponMongoRepository()
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
describe('Creat Coupon Mongo Repository', () => {
  it('Shoul return an coupon on success', async () => {
    const sut = makeSut()
    const coupon = await sut.add({
      name: 'validCouponName',
      code: 'invalidCode',
      discount: 10,
      type: 'percent',
      active: true
    })
    expect(coupon).toBeTruthy()
    expect(coupon.id).toBeTruthy()
    expect(coupon.name).toBe('validCouponName')
    expect(coupon.code).toBe('invalidCode')
    expect(coupon.discount).toBe(10)
    expect(coupon.type).toBe('percent')
    expect(coupon.active).toBe(true)
  })
})

describe('Load Coupon Mongo Repository', () => {
  it('Shoul load all coupon on success', async () => {
    const couponCollection = await MongoHelper.getColection('coupons')
    await couponCollection.insertMany([
      {
        id: '5fb2def8bba46a6ea99f545f',
        name: 'validCouponName',
        code: 'invalidCode',
        discount: 10,
        type: 'percent',
        active: true
      }, {
        id: '5fb2df539cbadc7018f190fe',
        name: 'validCouponName2',
        code: 'invalidCode2',
        discount: 10,
        type: 'percent',
        active: true
      }
    ])
    const sut = makeSut()
    const coupons = await sut.loadAll()
    expect(coupons.length).toBe(2)
  })
  it('Shoul return empty list', async () => {
    const sut = makeSut()
    const coupons = await sut.loadAll()
    expect(coupons.length).toBe(0)
  })

  describe('Load One Coupon Mongo Repository', () => {
    it('Shoul load ONE coupon on success', async () => {
      const couponCollection = await MongoHelper.getColection('coupons')
      const res = await couponCollection.insertMany([
        {
          id: '5fb2def8bba46a6ea99f545f',
          name: 'validCouponName',
          code: 'invalidCode',
          discount: 10,
          type: 'percent',
          active: true
        },
        {
          id: '5fb2def8bba46a6ea99f545fds',
          name: 'validCouponName',
          code: 'invalidCode',
          discount: 10,
          type: 'percent',
          active: true
        }
      ])
      const id = res.ops[0]._id
      const sut = makeSut()
      const coupon = await sut.findById(id)
      expect(coupon).toBeTruthy()
    })
  })
  it('Shoul load one coupon if query name is provider', async () => {
    const couponCollection = await MongoHelper.getColection('coupons')
    await couponCollection.insertMany([
      {
        id: '5fb2def8bba46a6ea99f545f',
        name: 'queryName',
        code: 'invalidCode',
        discount: 10,
        type: 'percent',
        active: true
      }, {
        id: '5fb2df539cbadc7018f190fe',
        name: 'validCouponName2',
        code: 'invalidCode2',
        discount: 10,
        type: 'percent',
        active: true
      }
    ])
    const sut = makeSut()
    const coupons = await sut.loadAll({ name: 'queryName' })
    expect(coupons.length).toBe(1)
  })
  it('Shoul load one coupon if query code is provider', async () => {
    const couponCollection = await MongoHelper.getColection('coupons')
    await couponCollection.insertMany([
      {
        id: '5fb2def8bba46a6ea99f545f',
        name: 'queryName',
        code: 'validCode',
        discount: 10,
        type: 'percent',
        active: true
      }, {
        id: '5fb2df539cbadc7018f190fe',
        name: 'validCouponName2',
        code: 'invalidCode',
        discount: 10,
        type: 'percent',
        active: true
      }
    ])
    const sut = makeSut()
    const coupons = await sut.findByCode('validCode')
    expect(coupons.id).toBe('5fb2def8bba46a6ea99f545f')
  })
  // it('Shoul delete one coupon', async () => {
  //   const couponCollection = await MongoHelper.getColection('coupons')
  //   await couponCollection.insertMany([
  //     {
  //       id: '5fb2def8bba46a6ea99f545f',
  //       name: 'queryName',
  //       code: 'validCode',
  //       discount: 10,
  //       type: 'percent',
  //       active: true
  //     }, {
  //       id: '5fb2df539cbadc7018f190fe',
  //       name: 'validCouponName2',
  //       code: 'invalidCode',
  //       discount: 10,
  //       type: 'percent',
  //       active: true
  //     }
  //   ])
  //   const sut = makeSut()
  //   const coupons = await sut.deleteCoupon('5fb2def8bba46a6ea99f545f')
  //   expect(coupons).toBe()
  // })
})
