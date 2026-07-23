import type {
  StorageObject,
  StorageProvider,
  StoragePutOptions,
} from './storage.types'

export class R2StorageProvider implements StorageProvider {
  constructor(private readonly bucket: R2Bucket) {}

  async put(
    key: string,
    value: ArrayBuffer | ReadableStream,
    options?: StoragePutOptions,
  ): Promise<void> {
    await this.bucket.put(key, value, {
      httpMetadata: options?.contentType
        ? { contentType: options.contentType }
        : undefined,
    })
  }

  async get(key: string): Promise<StorageObject | null> {
    const object = await this.bucket.get(key)
    if (!object?.body) {
      return null
    }
    return {
      body: object.body,
      contentType: object.httpMetadata?.contentType ?? null,
    }
  }

  async delete(key: string): Promise<void> {
    await this.bucket.delete(key)
  }
}
