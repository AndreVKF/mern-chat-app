import { ErrorHandler } from './ErrorHandler.js'

export class MissingRequiredBodyArgsError extends ErrorHandler {
  // TODO: this could be better
  constructor({ mandatoryArgs }) {
    super(`Args: ${mandatoryArgs}; Are mandatory.`)
  }
}
