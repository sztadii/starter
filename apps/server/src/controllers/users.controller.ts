import { z } from 'zod'
import type { AppContext } from '@/env'
import DbProvider from '@/providers/db'
import { UserRepository } from '@/repositories/user.repository'
import { UsersError, UsersService } from '@/services/users.service'

export class UsersController {
  private readonly context: AppContext
  private readonly usersService: UsersService

  constructor(context: AppContext) {
    this.context = context
    this.usersService = new UsersService(
      new UserRepository(new DbProvider(context.env.DB)),
      context.env.JWT_SECRET,
    )
  }

  async register(body: z.infer<typeof registerSchema>) {
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return this.context.json(
        { error: 'username and password (min 5 characters) are required' },
        400,
      )
    }

    try {
      const result = await this.usersService.register(parsed.data)
      return this.context.json(result, 201)
    } catch (error) {
      if (error instanceof UsersError) {
        return this.context.json({ error: error.message }, 409)
      }
      throw error
    }
  }

  async login(body: z.infer<typeof loginSchema>) {
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return this.context.json(
        { error: 'username and password are required' },
        400,
      )
    }

    try {
      const result = await this.usersService.login(
        parsed.data.username,
        parsed.data.password,
      )
      return this.context.json(result)
    } catch (error) {
      if (error instanceof UsersError) {
        return this.context.json({ error: error.message }, 401)
      }
      throw error
    }
  }

  async me() {
    const user = this.context.get('user')
    try {
      const result = await this.usersService.me(user.id)
      return this.context.json(result)
    } catch (error) {
      if (error instanceof UsersError) {
        return this.context.json({ error: error.message }, 401)
      }
      throw error
    }
  }

  async changePassword(body: z.infer<typeof changePasswordSchema>) {
    const parsed = changePasswordSchema.safeParse(body)
    if (!parsed.success) {
      return this.context.json(
        {
          error: 'currentPassword and password (min 5 characters) are required',
        },
        400,
      )
    }

    const user = this.context.get('user')
    try {
      await this.usersService.changePassword(
        user.id,
        parsed.data.currentPassword,
        parsed.data.password,
      )
      return this.context.json({ ok: true })
    } catch (error) {
      if (error instanceof UsersError) {
        const status = error.message === 'User not found' ? 401 : 400
        return this.context.json({ error: error.message }, status)
      }
      throw error
    }
  }
}

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
})

const registerSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(5),
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  password: z.string().min(5),
})
