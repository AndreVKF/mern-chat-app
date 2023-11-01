import { Router } from 'express'
import { UserController } from '../controllers/users.controller.js'

export class UsersRouter {
  router

  constructor() {
    this.usersController = new UserController()
    this.router = Router()

    this.setRouters()
  }

  setRouters = () => {
    this.router.post('/', this.usersController.create)
  }
}
