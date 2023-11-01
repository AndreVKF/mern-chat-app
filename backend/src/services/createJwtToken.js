import jwt from 'jsonwebtoken'
import { jwtConfig } from '../configs/jwtConfig.js'

export const createJwtToken = (userId, username) => {
  const { secret, expiresIn, algorithm } = jwtConfig
  const token = jwt.sign({ userId, username }, secret, {
    algorithm,
    expiresIn,
  })

  return token
}
