
interface branches {
  id?: string
  branchName?: string
}
export interface CouponModel{
  id: string
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
}
