const encoder = new TextEncoder()

/** Format: pbkdf2:<iterations>:<salt_b64>:<hash_b64> */
export async function hashPassword(password: string): Promise<string> {
  const iterations = 100_000
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await derive(password, salt, iterations)
  return `pbkdf2:${iterations}:${toBase64(salt)}:${toBase64(hash)}`
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [algo, iterStr, saltB64, hashB64] = stored.split(':')
  if (algo !== 'pbkdf2' || !iterStr || !saltB64 || !hashB64) {
    return false
  }
  const iterations = Number(iterStr)
  if (!Number.isFinite(iterations) || iterations < 1) {
    return false
  }
  const salt = fromBase64(saltB64)
  const expected = fromBase64(hashB64)
  const actual = await derive(password, salt, iterations)
  return timingSafeEqual(actual, expected)
}

function toBase64(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary)
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

async function derive(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    256,
  )
  return new Uint8Array(bits)
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false
  }
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0)
  }
  return diff === 0
}
