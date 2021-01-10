import { Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },
  async getColection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  maperNormalizeId: (data: any): any => {
    const { _id, ...collectionWhithouId } = data
    return Object.assign({}, collectionWhithouId, { id: _id })
  },
  convertToObjectId: (id: string): any => {
    return new ObjectId(id)
  },
  convertToIsoDate: (date: Date): any => {
    return new Date(date)
  },
  getDateNow: (): any => {
    return new Date()
  },
  maperCollection: (collections: any[]): any[] => {
    return collections.map(collection => MongoHelper.maperNormalizeId(collection))
  }
}
