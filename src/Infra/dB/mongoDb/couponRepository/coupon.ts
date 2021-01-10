import { AddCouponRepository } from '../../../../data/protocols/addCouponRepository'
import { AddCouponModel } from '../../../../Domain/useCases/addCoupons'
import { CouponModel } from '../../../../Domain/models/coupon'
import { MongoHelper } from '../helpers/mongoHelper'
import { loadCouponsRepository } from '../../../../data/protocols/loadCouponRepository'
import { loadOneCouponRepository } from '../../../../data/protocols/loadOneCouponRepository'
import { updateCouponModel } from '../../../../Domain/useCases/updateCoupon'
import { UpdateCouponRepository } from '../../../../data/protocols/updateCouponRepository'
import { loadValidCoupon } from '../../../../Domain/useCases/useValidateCoupon'
import { AddUsedCouponModel } from 'Domain/useCases/registerUsedCoupon'

export class CouponMongoRepository implements AddCouponRepository, loadCouponsRepository, loadOneCouponRepository, UpdateCouponRepository, loadValidCoupon {
  async add (couponData: AddCouponModel): Promise<CouponModel> {
    const couponCollection = await MongoHelper.getColection('coupons')
    couponData.startDate = MongoHelper.convertToIsoDate(couponData.startDate)
    couponData.endDate = MongoHelper.convertToIsoDate(couponData.endDate)
    couponData.createdAt = MongoHelper.getDateNow()
    const result = await couponCollection.insertOne(couponData)
    return MongoHelper.maperNormalizeId(result.ops[0])
  }

  async registerUsedCoupon (usedCoupon: AddUsedCouponModel): Promise<AddUsedCouponModel> {
    const couponCollection = await MongoHelper.getColection('used-coupons')
    usedCoupon.createdAt = MongoHelper.getDateNow()
    const result = await couponCollection.insertOne(usedCoupon)
    return MongoHelper.maperNormalizeId(result.ops[0])
  }

  async loadAll (queryData?: any): Promise<CouponModel[]> {
    let query = {}
    const couponCollection = await MongoHelper.getColection('coupons')
    if (queryData) {
      const { name, code } = queryData
      if (name) {
        query = { ...query, name: { $regex: name, $options: 'si' } }
      }
      if (code) {
        query = { ...query, code: { $regex: code, $options: 'si' } }
      }
    }
    const coupons = await couponCollection.find(query).toArray()
    return MongoHelper.maperCollection(coupons)
  }

  async findByCode (code: string): Promise<CouponModel> {
    const couponCollection = await MongoHelper.getColection('coupons')
    return await couponCollection.findOne({ code: code })
  }

  async findById (id: string): Promise<CouponModel> {
    const couponCollection = await MongoHelper.getColection('coupons')
    const coupon = await couponCollection.findOne({
      _id: MongoHelper.convertToObjectId(id)
    })
    return coupon && MongoHelper.maperNormalizeId(coupon)
  }

  async findUsedCoupon (cpf: string, code: string): Promise<any> {
    const couponCollection = await MongoHelper.getColection('used-coupons')
    const coupon = await couponCollection.findOne({
      $and: [
        { 'items.user.identity.value': cpf },
        { 'items.coupon.code': code }
      ]

    })
    return coupon && MongoHelper.maperNormalizeId(coupon)
  }

  async deleteCoupon (id: string): Promise<any> {
    const couponCollection = await MongoHelper.getColection('coupons')
    const coupon = await couponCollection.findOneAndDelete({
      _id: MongoHelper.convertToObjectId(id)
    })
    return coupon && MongoHelper.maperNormalizeId(coupon)
  }

  async update (id: string, data: updateCouponModel): Promise<CouponModel> {
    const couponResultCollection = await MongoHelper.getColection('coupons')
    const res = await couponResultCollection.findOneAndUpdate(
      { _id: MongoHelper.convertToObjectId(id) },
      {
        $set: {
          name: data.name,
          active: data.active,
          discount: data.discount,
          type: data.type,
          count: data.count,
          startDate: MongoHelper.convertToIsoDate(data.startDate),
          endDate: MongoHelper.convertToIsoDate(data.endDate),
          useOneById: data.useOneById,
          description: data.description,
          branches: data.branches,
          updatedAt: MongoHelper.getDateNow()
        }
      },
      {
        upsert: false,
        returnOriginal: false
      })
    return res.value && MongoHelper.maperNormalizeId(await res.value)
  }
}
