import type { Hono } from 'hono'
import { HealthController } from '@/controllers/health.controller'
import { UsersController } from '@/controllers/users.controller'
import type { AppEnv } from '@/env'
import { authMiddleware } from '@/middleware/auth.middleware'

export function createControllers(app: Hono<AppEnv>) {
  app.get('/health', (context) => {
    const healthController = new HealthController(context)
    return healthController.health()
  })

  app.post('/auth/register', async (context) => {
    const usersController = new UsersController(context)
    const body = await context.req.json().catch(() => null)
    return usersController.register(body)
  })

  app.post('/auth/login', async (context) => {
    const usersController = new UsersController(context)
    const body = await context.req.json().catch(() => null)
    return usersController.login(body)
  })

  app.get('/auth/me', authMiddleware, (context) => {
    const usersController = new UsersController(context)
    return usersController.me()
  })

  app.post('/auth/change-password', authMiddleware, async (context) => {
    const usersController = new UsersController(context)
    const body = await context.req.json().catch(() => null)
    return usersController.changePassword(body)
  })
}
