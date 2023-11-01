import { Router } from 'express'

import { SessionsRouter } from './sessions.routes.js'
import { UsersRouter } from './users.routes.js'

const setUpRoutes = Router()

const usersRouter = new UsersRouter()
const sessionsRouter = new SessionsRouter()

setUpRoutes.use('/users', usersRouter.router)
setUpRoutes.use('/sessions', sessionsRouter.router)

export const routes = setUpRoutes
