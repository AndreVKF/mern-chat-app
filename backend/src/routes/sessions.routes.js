import { Router } from 'express'
import { SessionsController } from '../controllers/sessions.controller.js'

export class SessionsRouter {
  router

  constructor() {
    this.sessionsController = new SessionsController()
    this.router = Router()

    this.setRouters()
  }

  setRouters = () => {
    this.router.post('/', this.sessionsController.create)
    this.router.get('/refresh', this.sessionsController.refresh)
  }
}
