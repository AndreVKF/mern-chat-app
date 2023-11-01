import jwt from 'jsonwebtoken'

import { TokenInvalidError } from '../errors/TokenInvalidError.js'
import { TokenNotInformedError } from '../errors/TokenNotInformedError.js'

export const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new TokenNotInformedError()
  }

  const [, token] = authHeader.split(' ')

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId }

    return next()
  } catch {
    throw new TokenInvalidError()
  }
}
