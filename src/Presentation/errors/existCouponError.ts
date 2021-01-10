export class ExistCouponError extends Error {
  constructor () {
    super()
    this.name = 'ExistCouponError'
    this.message = 'Coupon already created'
  }
}
