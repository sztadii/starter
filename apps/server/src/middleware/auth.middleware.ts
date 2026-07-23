import { createMiddleware } from 'hono/factory'
import type { AppEnv } from '@/env'
import { verifyUserToken } from '@/lib/jwt'

export const authMiddleware = createMiddleware<AppEnv>(
  async function authMiddleware(c, next) {
    const header = c.req.header('Authorization')
    if (!header?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    const token = header.slice('Bearer '.length).trim()
    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    try {
      const user = await verifyUserToken(token, c.env.JWT_SECRET)
      c.set('user', user)
      await next()
    } catch {
      return c.json({ error: 'Unauthorized' }, 401)
    }
  },
)
