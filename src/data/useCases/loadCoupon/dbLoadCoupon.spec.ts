import { loadCouponsRepository } from '../../protocols/loadCouponRepository'
import { CouponModel } from '../../../Domain/models/coupon'
import { DbLoadCoupons } from './dbLoadCoupon'
describe('Db Load Coupons', () => {
  const makeFakeCoupons = (): CouponModel[] => {
    return [{
      id: 'validId',
      name: 'validCouponName',
      code: 'validCode',
      discount: 10,
      type: 'percent',
      active: true
    },
    {
      id: 'validId2',
      name: 'validCouponName2',
      code: 'validCode2',
      discount: 20,
      type: 'fixed',
      active: true
    }]
  }

  interface SutTypes {
    sut: DbLoadCoupons
    loadCouponsRepositoryStub: loadCouponsRepository
  }

  const makeLoadCouponsRepository = (): loadCouponsRepository => {
    class LoadCouponsRepositoryStub implements loadCouponsRepository {
      async loadAll (filters?: any): Promise<CouponModel[]> {
        return await new Promise(resolve => resolve(makeFakeCoupons()))
      }
    }
    return new LoadCouponsRepositoryStub()
  }
  const makeSut = (): SutTypes => {
    const loadCouponsRepositoryStub = makeLoadCouponsRepository()
    const sut = new DbLoadCoupons(loadCouponsRepositoryStub)
    return {
      sut,
      loadCouponsRepositoryStub
    }
  }
  test('Should call loadCouponsRepository', async () => {
    const { sut, loadCouponsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCouponsRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Should call loadCouponsRepository with query', async () => {
    const { sut, loadCouponsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCouponsRepositoryStub, 'loadAll')
    const query = { name: 'anyName' }
    await sut.load(query)
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Should return a list of coupons on success', async () => {
    const { sut } = makeSut()
    const coupons = await sut.load()
    expect(coupons).toEqual(makeFakeCoupons())
  })
  test('Should be 500 if loadCouponsRepository throws', async () => {
    const { sut, loadCouponsRepositoryStub } = makeSut()
    jest.spyOn(loadCouponsRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
  test('Should be call loadCouponRepository with correct query name', async () => {
    const { sut, loadCouponsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCouponsRepositoryStub, 'loadAll')
    await sut.load({ name: 'anyName' })
    expect(loadAllSpy).toHaveBeenCalledWith({ name: 'anyName' })
  })
  test('Should be call loadCouponRepository with correct query code', async () => {
    const { sut, loadCouponsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCouponsRepositoryStub, 'loadAll')
    await sut.load({ code: 'anyCode' })
    expect(loadAllSpy).toHaveBeenCalledWith({ code: 'anyCode' })
  })
})
