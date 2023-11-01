/*
  index - GET to list records
  show - GET to show specific record
  create - POST creat record
  update - PUT to update record
  delete - DELETE to remove record
*/

import { UserModel } from '../models/User.js'

import { hash } from 'bcrypt'
import { UserAlreadyRegisteredError } from '../errors/UserAlreadyRegisteredError.js'

export class UserController {
  create = async (req, res) => {
    const { username, email, password } = req.body

    const isUserRegistered = await UserModel.exists({
      email,
    })

    if (isUserRegistered) {
      throw new UserAlreadyRegisteredError()
    }

    const hashedPassword = await hash(password, Number(process.env.BCRYPT_SALT))

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    })

    await user.save()

    return res.status(201).send({})
  }
}
