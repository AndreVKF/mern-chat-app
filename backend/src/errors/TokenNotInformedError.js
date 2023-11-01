import { ErrorHandler } from './ErrorHandler.js'

export class TokenNotInformedError extends ErrorHandler {
  constructor() {
    super('Authorization not informed.', 401)
  }
}
