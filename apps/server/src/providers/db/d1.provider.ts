import type { DbProvider, DbRunResult } from './db.types'

export class D1Provider implements DbProvider {
  constructor(private readonly db: D1Database) {}

  async first<T>(sql: string, ...binds: unknown[]): Promise<T | null> {
    return this.db
      .prepare(sql)
      .bind(...binds)
      .first<T>()
  }

  async run(sql: string, ...binds: unknown[]): Promise<DbRunResult> {
    const result = await this.db
      .prepare(sql)
      .bind(...binds)
      .run()
    return { changes: result.meta.changes ?? 0 }
  }
}
