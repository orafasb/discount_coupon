import { CouponModel } from '../../../Domain/models/coupon'
import { loadOneCouponRepository } from '../../protocols/loadOneCouponRepository'
import { DbLoadOneCoupon } from './dbLoadOneCoupon'

describe('Db Load One Coupons by ID', () => {
  const makeFakeCoupon = (): CouponModel => {
    return {
      id: 'validId',
      name: 'validCouponName',
      code: 'validCode',
      discount: 10,
      type: 'percent',
      active: true
    }
  }

  interface SutTypes {
    sut: DbLoadOneCoupon
    loadOneCouponsRepositoryStub: loadOneCouponRepository
  }

  const makeLoadOneCouponsRepository = (): loadOneCouponRepository => {
    class LoadOneCouponRepositoryStub implements loadOneCouponRepository {
      async findById (): Promise<CouponModel> {
        return await new Promise(resolve => resolve(makeFakeCoupon()))
      }
    }
    return new LoadOneCouponRepositoryStub()
  }
  const makeSut = (): SutTypes => {
    const loadOneCouponsRepositoryStub = makeLoadOneCouponsRepository()
    const sut = new DbLoadOneCoupon(loadOneCouponsRepositoryStub)
    return {
      sut,
      loadOneCouponsRepositoryStub
    }
  }
  test('Should call loadOneCouponsRepositoryStub', async () => {
    const { sut, loadOneCouponsRepositoryStub } = makeSut()
    const findByIdneSpy = jest.spyOn(loadOneCouponsRepositoryStub, 'findById')
    await sut.loadOne('validId')
    expect(findByIdneSpy).toHaveBeenCalledWith('validId')
  })
  test('Should return a one coupon', async () => {
    const { sut } = makeSut()
    const oneCoupon = await sut.loadOne('validId')
    expect(oneCoupon).toEqual(makeFakeCoupon())
  })
})
