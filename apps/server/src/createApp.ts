import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createControllers } from '@/createControllers'
import type { AppEnv } from '@/env'

export function createApp() {
  const app = new Hono<AppEnv>()

  app.use(
    '*',
    cors({
      origin: '*',
      allowHeaders: ['Authorization', 'Content-Type'],
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  )

  app.get('/', (context) => context.text('Welcome!'))

  createControllers(app)

  return app
}
