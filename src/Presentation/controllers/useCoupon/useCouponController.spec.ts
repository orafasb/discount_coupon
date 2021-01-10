import { UseCouponController } from './useCouponController'
import { loadValidCoupon, useValideCouponModel } from '../../../Domain/useCases/useValidateCoupon'
import { CouponValidatorInUse } from '../../../Presentation/protocols/couponValidatoInUse'
import { MapperCoupon } from '../../../Presentation/protocols/mapperCoupon'
import { serverError } from '../../../Presentation/helpers/httpHelper'
import { CouponModel, HttpRequest } from '../coupons/couponsProtocols'

describe('Load Coupon Controller', () => {
  interface SutTypes {
    sut: UseCouponController
    loadCouponsStub: loadValidCoupon
    couponValidatorStub: CouponValidatorInUse
    mapperCoupon: MapperCoupon
  }
  const makeLoadCoupons = (): loadValidCoupon => {
    class LoadValidCouponStub implements loadValidCoupon {
      async findByCode (id: string): Promise<CouponModel> {
        return await new Promise(resolve => resolve(makeFakeCoupons()))
      }
    }

    return new LoadValidCouponStub()
  }
  const makeCouponValidator = (): CouponValidatorInUse => {
    class CouponValidatorInUseStub implements CouponValidatorInUse {
      async validate (coupon: useValideCouponModel): Promise<useValideCouponModel> {
        return coupon
      }

      async isValid (coupon: useValideCouponModel): Promise<boolean> {
        return true
      }
    }
    return new CouponValidatorInUseStub()
  }
  const makeMapperCoupons = (): MapperCoupon => {
    class MapperCouponStub implements MapperCoupon {
      async mapperCoupon (coupon: useValideCouponModel): Promise<any> {
        return await new Promise(resolve => resolve(makeFakeRequest()))
      }
    }

    return new MapperCouponStub()
  }

  const makeFakeRequest = (): HttpRequest => ({
    body: {
      code: 'validCode'
    }
  })

  const makeSut = (): SutTypes => {
    const loadCouponsStub = makeLoadCoupons()
    const couponValidatorStub = makeCouponValidator()
    const mapperCoupon = makeMapperCoupons()
    const sut = new UseCouponController(couponValidatorStub, loadCouponsStub, mapperCoupon)
    return {
      sut,
      loadCouponsStub,
      couponValidatorStub,
      mapperCoupon
    }
  }
  const makeFakeCoupons = (): CouponModel => {
    return {
      id: 'validId',
      name: 'validCouponName',
      code: 'validCode',
      discount: 10,
      type: 'percent',
      active: true
    }
  }
  test('Should returned 200 on success', async () => {
    const { loadCouponsStub } = makeSut()
    const coupom = await loadCouponsStub.findByCode(makeFakeCoupons().code)
    expect(coupom.code).toBe(makeFakeCoupons().code)
  })

  test('Should be 500 if loadCouponsByCode throws', async () => {
    const { sut, loadCouponsStub } = makeSut()
    jest.spyOn(loadCouponsStub, 'findByCode').mockReturnValueOnce(new Promise((resolve, reject) => reject(serverError(new Error()))))
    const httpResponse = await sut.route({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should call mapper function on success', async () => {
    const { sut, loadCouponsStub, mapperCoupon } = makeSut()
    const coupom = await loadCouponsStub.findByCode(makeFakeCoupons().code)
    jest.spyOn(mapperCoupon, 'mapperCoupon').mockReturnValueOnce((new Promise((resolve) => resolve)))
    await sut.route({})
    expect(coupom).toEqual(makeFakeCoupons())
  })
})
