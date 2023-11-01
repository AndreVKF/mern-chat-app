import { AuthenticationError } from '../errors/AuthenticationError.js'
import { UserModel } from '../models/User.js'

import jwt from 'jsonwebtoken'

import { compare } from 'bcrypt'
import { jwtConfig } from '../configs/jwtConfig.js'
import { TokenInvalidError } from '../errors/TokenInvalidError.js'
import { TokenNotInformedError } from '../errors/TokenNotInformedError.js'
import { createJwtToken } from '../services/createJwtToken.js'

export class SessionsController {
  create = async (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({
      email,
    })

    if (!user) {
      throw new AuthenticationError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new AuthenticationError()
    }

    const token = createJwtToken(user._id, user.username)

    res.json({ token, userId: user._id, username: user.username })
  }

  refresh = async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new TokenNotInformedError()
    }

    const [, token] = authHeader.split(' ')

    if (!token || token === 'undefined') {
      throw new TokenNotInformedError()
    }

    try {
      const { secret } = jwtConfig
      const { userId, username } = jwt.verify(token, secret)

      const newToken = createJwtToken(userId, username)
      res.json({ token: newToken, userId, username })
    } catch (err) {
      throw new TokenInvalidError()
    }
  }
}
