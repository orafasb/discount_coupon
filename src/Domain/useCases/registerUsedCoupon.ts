
export interface AddUsedCouponModel{
  items: object[]
  createdAt: Date
}

export interface AddUsedCoupon {
  registerUsedCoupon: (usedCoupon: AddUsedCouponModel) => Promise<AddUsedCouponModel>
}
