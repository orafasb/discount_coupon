import { LoadOneAndDeleteCoupon } from '../deleteCoupon/deleteCouponController'
import { deleteCoupon } from '../../../Domain/useCases/deleteCoupon'

const makedeleteCoupon = (): deleteCoupon => {
  class DeleteCouponStub implements deleteCoupon {
    async deleteCoupon (id: string): Promise<any> {
      return await new Promise(resolve => resolve({ Deleted: `The coupon id: ${id}, was successfully deleted` }))
    }
  }
  return new DeleteCouponStub()
}
interface SutTypes{
  sut: LoadOneAndDeleteCoupon
  deleteCouponStub: deleteCoupon
}
const MakeSut = (): SutTypes => {
  const deleteCouponStub = makedeleteCoupon()
  const sut = new LoadOneAndDeleteCoupon(deleteCouponStub)
  return { sut, deleteCouponStub }
}
describe('LoadOneAndDeleteCoupon', () => {
  it('should deleted one coupon', async () => {
    const { deleteCouponStub } = MakeSut()
    const fakeCoupon = {
      body: {
        id: 'validId'
      }
    }
    const deletedeCoupon = await deleteCouponStub.deleteCoupon(fakeCoupon.body.id)
    expect(deletedeCoupon).toStrictEqual({ Deleted: `The coupon id: ${fakeCoupon.body.id}, was successfully deleted` })
  })
})
