import { LogErrorRepository } from '../../../../data/protocols/logErrorRepository'
import { MongoHelper } from '../helpers/mongoHelper'
export class LogMongoReposytory implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getColection('errors')
    await errorCollection.insertOne({
      stack,
      data: new Date()
    })
  }
}
