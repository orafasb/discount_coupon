import { LoadCouponsController } from './loadCouponController'
import { CouponModel } from '../../../Domain/models/coupon'
import { loadCoupons } from './loadCouponsControllerProtocols'
import { noContent, ok, serverError } from '../../helpers/httpHelper'

describe('Load Coupon Controller', () => {
  interface SutTypes {
    sut: LoadCouponsController
    loadCouponsStub: loadCoupons
  }
  const makeLoadCoupons = (): loadCoupons => {
    class LoadCouponsStub implements loadCoupons {
      async load (query?: any): Promise<CouponModel[]> {
        return await new Promise(resolve => resolve(makeFakeCoupons()))
      }
    }

    return new LoadCouponsStub()
  }

  const makeSut = (): SutTypes => {
    const loadCouponsStub = makeLoadCoupons()
    const sut = new LoadCouponsController(loadCouponsStub)
    return {
      sut,
      loadCouponsStub
    }
  }
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
  test('Should returned 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse).toEqual(ok(makeFakeCoupons()))
  })

  test('Should be 500 if loadCoupons throws', async () => {
    const { sut, loadCouponsStub } = makeSut()
    jest.spyOn(loadCouponsStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.route({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should be return 204 if loadCoupons returns empty', async () => {
    const { sut, loadCouponsStub } = makeSut()
    jest.spyOn(loadCouponsStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.route({})
    expect(httpResponse).toEqual(noContent())
  })
})
