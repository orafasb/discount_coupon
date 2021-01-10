export class CouponNotValid extends Error {
  constructor (reason: string) {
    super('Is not a valid coupon')
    this.name = 'IsNotAValidCoupon'
    this.message = `${reason}`
  }
}
