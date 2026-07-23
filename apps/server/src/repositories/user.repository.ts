import type { DbProvider } from '@/providers/db'

export type UserRow = {
  id: string
  username: string
  password_hash: string
  created_at: string
}

export class UserRepository {
  constructor(private readonly db: DbProvider) {}

  async findByUsername(username: string): Promise<UserRow | null> {
    return this.db.first<UserRow>(
      'SELECT id, username, password_hash, created_at FROM users WHERE username = ?',
      username,
    )
  }

  async findById(id: string): Promise<UserRow | null> {
    return this.db.first<UserRow>(
      'SELECT id, username, password_hash, created_at FROM users WHERE id = ?',
      id,
    )
  }

  async create(input: {
    id: string
    username: string
    passwordHash: string
  }): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)',
      input.id,
      input.username,
      input.passwordHash,
    )
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<void> {
    await this.db.run(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      passwordHash,
      id,
    )
  }
}
