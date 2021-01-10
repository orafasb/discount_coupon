import { Controller, HttpRequest, HttpResponse } from '../../Presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/logErrorRepository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository
  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.route(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
