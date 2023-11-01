import { ErrorHandler } from './ErrorHandler.js'

export class TokenInvalidError extends ErrorHandler {
  constructor() {
    super('Invalid token.', 401)
  }
}
