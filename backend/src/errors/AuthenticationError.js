import { ErrorHandler } from './ErrorHandler.js'

export class AuthenticationError extends ErrorHandler {
  constructor() {
    super('Email and/or password incorrect.', 401)
  }
}
