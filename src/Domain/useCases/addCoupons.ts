import { CouponModel } from '../models/coupon'

export interface AddCouponModel{
  name: string
  code: string
  discount: number
  type: string
  active: boolean
  count?: number
  startDate?: Date
  endDate?: Date
  useOneById?: boolean
  description?: string
  branches?: object[]
  createdAt?: Date
}

export interface AddCoupon {
  add: (account: AddCouponModel) => Promise<CouponModel>
}
