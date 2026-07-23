export type CachePutOptions = {
  ttlSeconds?: number
}

export type CacheProvider = {
  get(key: string): Promise<Uint8Array | null>
  put(key: string, value: Uint8Array, options?: CachePutOptions): Promise<void>
  delete(key: string): Promise<void>
  deletePrefix(prefix: string): Promise<void>
}
