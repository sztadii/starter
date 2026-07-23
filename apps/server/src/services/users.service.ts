import { signUserToken } from '@/lib/jwt'
import { hashPassword, verifyPassword } from '@/lib/password'
import type { UserRepository } from '@/repositories/user.repository'

export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtSecret: string,
  ) {}

  async register(input: {
    username: string
    password: string
  }): Promise<{ token: string }> {
    const existing = await this.userRepository.findByUsername(input.username)
    if (existing) {
      throw new UsersError('Username already taken')
    }

    const userId = crypto.randomUUID()
    const passwordHash = await hashPassword(input.password)

    await this.userRepository.create({
      id: userId,
      username: input.username,
      passwordHash,
    })

    const token = await signUserToken(
      {
        id: userId,
        username: input.username,
      },
      this.jwtSecret,
    )
    return { token }
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByUsername(username)
    if (!user) {
      throw new UsersError('Invalid username or password')
    }
    const ok = await this.passwordMatches(password, user.password_hash)
    if (!ok) {
      throw new UsersError('Invalid username or password')
    }
    const token = await signUserToken(
      {
        id: user.id,
        username: user.username,
      },
      this.jwtSecret,
    )
    return { token }
  }

  async me(userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UsersError('User not found')
    }
    return {
      id: user.id,
      username: user.username,
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UsersError('User not found')
    }
    const ok = await this.passwordMatches(currentPassword, user.password_hash)
    if (!ok) {
      throw new UsersError('Current password is incorrect')
    }
    const passwordHash = await hashPassword(newPassword)
    await this.userRepository.updatePasswordHash(userId, passwordHash)
  }

  private async passwordMatches(
    password: string,
    stored: string,
  ): Promise<boolean> {
    if (stored.startsWith('pbkdf2:')) {
      return verifyPassword(password, stored)
    }
    return password === stored
  }
}

export class UsersError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UsersError'
  }
}
