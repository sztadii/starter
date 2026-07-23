export type StoragePutOptions = {
  contentType?: string
}

export type StorageObject = {
  body: ReadableStream
  contentType: string | null
}

export type StorageProvider = {
  put(
    key: string,
    value: ArrayBuffer | ReadableStream,
    options?: StoragePutOptions,
  ): Promise<void>
  get(key: string): Promise<StorageObject | null>
  delete(key: string): Promise<void>
}
