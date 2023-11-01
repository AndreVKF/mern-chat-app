import { ErrorHandler } from './ErrorHandler.js'

export class UserAlreadyRegisteredError extends ErrorHandler {
  constructor() {
    super('User already registered.', 400)
  }
}
