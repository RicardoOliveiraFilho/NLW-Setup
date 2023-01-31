import WebPush from 'web-push'
import { FastifyInstance } from "fastify"
import { z } from 'zod'

const publicKey = 'BDJwN28IZUqs7I8r_9MPeDrpprjEaYJSOWUSR7HBxqPeVq_373eC7cIRQhqSCjS0aJ54c2GUpTn_SloIT1lGbdA'
const privateKey = 'PH-oP-dJ7XyocWqJOzAO44aZJM0QwyCWI16LsjuaoMA'

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey,
)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey,
    }
  })

  app.post('/push/register', (request, reply) => {
    console.log(request.body)
    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    })

    const { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'Hello do Backend!')
    }, 5000)

    return reply.status(201).send()
  })
}
