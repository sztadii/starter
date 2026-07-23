import type { Context } from 'hono'

export type AuthUser = {
  id: string
  username: string
}

export type Env = {
  DB: D1Database
  CACHE: KVNamespace
  STORAGE: R2Bucket
  AI: Ai
  EMAIL: SendEmail
  JWT_SECRET: string
  SERVER_NAME?: string
  EMAIL_FROM?: string
  AI_MODEL?: string
}

export type AppVariables = {
  user: AuthUser
}

export type AppEnv = {
  Bindings: Env
  Variables: AppVariables
}

export type AppContext = Context<AppEnv>
