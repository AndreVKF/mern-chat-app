import { ErrorHandler } from '../errors/ErrorHandler.js'

export const errors = (err, req, res, next) => {
  if (err.constructor.prototype instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      message: err.message,
    })

    return
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  })
}
