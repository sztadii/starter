export type DbRunResult = {
  changes: number
}

/** Swappable SQL backend — D1 today, another driver later. */
export type DbProvider = {
  first<T>(sql: string, ...binds: unknown[]): Promise<T | null>
  run(sql: string, ...binds: unknown[]): Promise<DbRunResult>
}
