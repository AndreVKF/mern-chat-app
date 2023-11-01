import jwt from 'jsonwebtoken'
import { WebSocketServer } from 'ws'

import { removeDuplicateClients } from '../common/functions.js'
import { MessageModel } from '../models/Message.js'
import { UserModel } from '../models/User.js'

const reToken =
  /[?|&]{1}token=([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9\-+/=_]*)&{0,1}/gm

export class WSS {
  wss

  constructor(server) {
    this.wss = new WebSocketServer({ server })
  }

  static create(server) {
    return new WebSocketServer({ server })
  }

  execute = () => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    self.wss.on('connection', async (connection, req) => {
      const reExec = reToken.exec(req.url)

      const allUsers = await UserModel.find().sort({
        username: 1,
      })

      if (reExec) {
        const token = `${reExec[1]}.${reExec[2]}.${reExec[3]}`

        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(userId)

        if (user) {
          connection.userId = userId
          connection.username = user.username
          connection.email = user.email
          connection.token = token
          connection.isAlive = true

          // set death timer
          connection.timer = setInterval(() => {
            connection.ping()
            connection.deathTimer = setTimeout(() => {
              connection.isAlive = false
              clearInterval(connection.timer)
              connection.close()
              connection.terminate()
              broadcastOnlineUsers()
            }, 1000)
          }, 5000)
        }

        broadcastOnlineUsers()
      }

      function broadcastOnlineUsers() {
        const clientConnectionsArray = [...self.wss.clients].filter(
          (connection) => {
            return connection.isAlive === true
          },
        )
        // broadcast online users (when someone connects)
        const connectedClientsArray = clientConnectionsArray.map((c) => ({
          userId: c.userId,
          username: c.username,
          email: c.email,
          token: c.token,
        }))

        // get all connected clients
        const uniqueConnectedClientsArray = removeDuplicateClients(
          connectedClientsArray,
        )

        const allUsersWithConnectionStatus = allUsers.map((user) => {
          const isUserConnected = !!uniqueConnectedClientsArray.find(
            (client) => {
              return user._doc._id.equals(client.userId)
            },
          )
          const { username, email, _id } = user._doc

          const userData = {
            userId: _id,
            username,
            email,
            isUserConnected,
          }

          return userData
        })

        console.log('alive connections: ', uniqueConnectedClientsArray.length)
        // broadcast message with all online users
        clientConnectionsArray.forEach((client) => {
          client.send(
            JSON.stringify({
              chatUsers: allUsersWithConnectionStatus,
            }),
          )
        })
      }

      connection.on('pong', () => {
        clearTimeout(connection.deathTimer)
      })

      // message user
      connection.on('message', async (data) => {
        const { messageType, authorId, recipientId, message } = JSON.parse(
          data.toString(),
        )

        if (messageType !== 'NEW_MESSAGE') return

        const messageDoc = await MessageModel.create({
          authorId,
          recipientId,
          message,
        })

        await messageDoc.save()

        const clientConnectionsArray = [...self.wss.clients]
        const recipientConns = clientConnectionsArray.filter((client) => {
          return client.userId === recipientId || client.userId === authorId
        })

        recipientConns.forEach((recipientConn) =>
          recipientConn.send(
            JSON.stringify({
              messageType: 'NEW_MESSAGE',
              message: messageDoc,
            }),
          ),
        )
      })

      // get message history
      connection.on('message', async (data) => {
        const { messageType, recipientId, authorId } = JSON.parse(
          data.toString(),
        )

        if (messageType !== 'HISTORY') return

        const messageDocs = await MessageModel.find({
          recipientId: { $in: [authorId, recipientId] },
          authorId: { $in: [authorId, recipientId] },
        })
          .sort({ createdAt: 1 })
          .exec()

        const clientConnectionsArray = [...self.wss.clients]
        const authorConns = clientConnectionsArray.filter(
          (client) => client.userId === authorId,
        )

        authorConns.forEach((authorConn) => {
          authorConn.send(
            JSON.stringify({
              messageType: 'HISTORY',
              messages: messageDocs,
            }),
          )
        })
      })

      connection.on('message', async (data) => {
        const { messageType, token } = JSON.parse(data.toString())

        if (messageType !== 'TERMINATE') return

        const clientConnectionsArray = [...self.wss.clients]
        const terminateClientsConnections = clientConnectionsArray.filter(
          (client) => client.token === token,
        )

        // clientConnectionsArray.forEach((conn) => conn.terminate())

        terminateClientsConnections.forEach((connection) => {
          connection.isAlive = false
          connection.close()
          connection.terminate()
        })
        setTimeout(() => {
          broadcastOnlineUsers()
        }, 1000)
      })
    })
  }
}
