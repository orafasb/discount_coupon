
import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error,
  message: { message: error.message }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
export const couponIsValid = (mapperCoupon: any): HttpResponse => ({
  statusCode: 200,
  body: {
    isValid: true,
    purchaseData: mapperCoupon
  },
  couponValid: { status: true }
})
export const couponIsNotValid = (reason: object): HttpResponse => ({
  statusCode: 400,
  body: { isValid: false, IsNotValidCoupon: reason },
  couponValid: { status: false }
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: []
})

export const success = (id: string): HttpResponse => ({
  statusCode: 200,
  body: { Deleted: `The coupon id: ${id}, was successfully deleted` }
})
