import { CouponModel } from '../models/coupon'

interface branches {
  id?: string
  branchName?: string
}
export interface updateCouponModel{
  name: string
  discount: number
  type: string
  active: boolean
  count?: number
  startDate?: Date
  endDate?: Date
  useOneById?: boolean
  description?: string
  branches?: branches[]
  createdAt?: Date
  updatedAt?: Date
}

export interface updateCoupon {
  update: (id: string, coupon: updateCouponModel) => Promise<CouponModel>
}
