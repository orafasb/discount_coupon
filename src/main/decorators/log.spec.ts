
import { Controller, HttpRequest, HttpResponse } from '../../Presentation/protocols'
import { LogControllerDecorator } from './log'
import { serverError } from '../../Presentation/helpers/httpHelper'
import { LogErrorRepository } from '../../data/protocols/logErrorRepository'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogerrorRepositoryStub implements LogErrorRepository {
    async log (Stack: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new LogerrorRepositoryStub()
}
const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async route (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httResponse = {
        statusCode: 200,
        body: {
          name: 'validCouponName',
          code: 'validCode',
          discount: 10,
          type: 'percent',
          active: true
        }
      }
      return await new Promise(resolve => resolve(httResponse))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}
describe('Log Controller Decaorator', () => {
  test('Should call controller route', async () => {
    const { sut, controllerStub } = makeSut()
    const routeSpy = jest.spyOn(controllerStub, 'route')
    const httpRequest = {
      body: {
        name: 'validCouponName',
        code: 'validCode',
        discount: 10,
        type: 'percent',
        active: true
      }
    }
    await sut.route(httpRequest)
    expect(routeSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should return the same results of controller ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'validCouponName',
        code: 'validCode',
        discount: 10,
        type: 'percent',
        active: true
      }
    }
    const HttpResponse = await sut.route(httpRequest)
    expect(HttpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'validCouponName',
        code: 'validCode',
        discount: 10,
        type: 'percent',
        active: true
      }
    })
  })
  test('Should call LogErrorReposytory with correct error if controller return a server error  ', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = (serverError(fakeError))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'route').mockReturnValueOnce(new Promise(resolve => resolve(error)))
    const httpRequest = {
      body: {
        name: 'validCouponName',
        code: 'validCode',
        discount: 10,
        type: 'percent',
        active: true
      }
    }
    await sut.route(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
