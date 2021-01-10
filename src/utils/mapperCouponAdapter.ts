import { useValideCouponModel } from '../Domain/useCases/useValidateCoupon'
import { MapperCoupon } from '../Presentation/protocols/mapperCoupon'

export class CouponMapper implements MapperCoupon {
  async mapperCoupon (coupon: useValideCouponModel, purchaseData: any): Promise<any> {
    const validBranches = []
    const invalidBranches = []
    for (const purchaseBranche of purchaseData.items) {
      if (coupon.branches.find((branch) => branch.id === purchaseBranche.branchId)) {
        const { type, discount } = coupon
        const oldValue = purchaseBranche.partner.price
        purchaseBranche.partner.off = discount
        purchaseBranche.partner.typeOfDiscount = type
        purchaseBranche.partner.subtotal = oldValue
        const newValue = (oldValue * discount) / 100
        purchaseBranche.partner.totalOff = newValue
        purchaseBranche.partner.total = oldValue - newValue
        validBranches.push(purchaseBranche)
      } else {
        invalidBranches.push(purchaseBranche)
      }
    }
    const totalValidBranches = validBranches.reduce((acc, branch) => {
      return {
        total: parseFloat(acc.total) + parseFloat(branch.partner.total),
        subtotal: parseFloat(acc.subtotal) + parseFloat(branch.partner.subtotal),
        totalOff: parseFloat(acc.totalOff) + parseFloat(branch.partner.totalOff)
      }
    }, { total: 0, subtotal: 0, totalOff: 0 })
    const totalInvalidBranches = invalidBranches.reduce((acc, branch) => {
      return {
        total: parseFloat(acc.total) + parseFloat(branch.partner.total)
      }
    }, { total: 0 })
    return {
      discountApplied: validBranches,
      discountNotApplied: invalidBranches,
      total: {
        subTotal: parseFloat(totalValidBranches.subtotal) + parseFloat(totalInvalidBranches.total),
        off: coupon.discount,
        typeOfDiscount: coupon.type,
        totalOff: totalValidBranches.totalOff,
        total: parseFloat(totalValidBranches.total) + parseFloat(totalInvalidBranches.total)
      },
      user: purchaseData.user
    }
  }
}
