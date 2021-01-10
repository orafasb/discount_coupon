import { CouponModel } from '../models/coupon'

interface branches {
  id?: string
  branchName?: string
}
export interface useValideCouponModel{
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
  branches?: branches[]
  createdAt?: Date
  updatedAt?: Date
  purchaseData?: any

}

export interface loadValidCoupon {
  findByCode: (code: string) => Promise<CouponModel>
}
