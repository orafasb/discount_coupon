import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongoHelper'
import { LogMongoReposytory } from './log'

const makeSut = (): LogMongoReposytory => {
  return new LogMongoReposytory()
}
describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getColection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should Creator log error on success', async () => {
    const sut = makeSut()
    await sut.log('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
