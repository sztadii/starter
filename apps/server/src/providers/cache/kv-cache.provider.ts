import type { CacheProvider, CachePutOptions } from './cache.types'

export class KvCacheProvider implements CacheProvider {
  constructor(private readonly kv: KVNamespace) {}

  async get(key: string): Promise<Uint8Array | null> {
    const value = await this.kv.get(key, 'arrayBuffer')
    if (!value) {
      return null
    }
    return new Uint8Array(value)
  }

  async put(
    key: string,
    value: Uint8Array,
    options?: CachePutOptions,
  ): Promise<void> {
    const ttlSeconds = options?.ttlSeconds
    await this.kv.put(key, value, {
      expirationTtl:
        ttlSeconds && ttlSeconds > 0 ? Math.floor(ttlSeconds) : undefined,
    })
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete(key)
  }

  async deletePrefix(prefix: string): Promise<void> {
    let cursor: string | undefined
    do {
      const listed = await this.kv.list({ prefix, cursor })
      if (listed.keys.length > 0) {
        await Promise.all(
          listed.keys.map((entry) => this.kv.delete(entry.name)),
        )
      }
      cursor = listed.list_complete ? undefined : listed.cursor
    } while (cursor)
  }
}
