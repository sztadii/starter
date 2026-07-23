import { jwtVerify, SignJWT } from 'jose'
import type { AuthUser } from '@/env'

const USER_TOKEN_TTL = '30m'

export async function signUserToken(
  user: AuthUser,
  secret: string,
): Promise<string> {
  return new SignJWT({
    username: user.username,
    typ: 'user',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(USER_TOKEN_TTL)
    .sign(secretKey(secret))
}

export async function verifyUserToken(
  token: string,
  secret: string,
): Promise<AuthUser> {
  const { payload } = await jwtVerify(token, secretKey(secret))
  if (payload.typ !== 'user') {
    throw new Error('Invalid token type')
  }
  const id = payload.sub
  const username = payload.username
  if (!id || typeof username !== 'string') {
    throw new Error('Invalid token payload')
  }
  return {
    id,
    username,
  }
}

function secretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret)
}
