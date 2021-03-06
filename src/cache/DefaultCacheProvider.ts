import { CacheProvider, Client } from '@src/core'
import { Collection } from '@src/collection'
import { CacheProviderDeleteOptions } from '@src/core/providers/cache/options/CacheProviderDeleteOptions'
import { CacheProviderGetOptions } from '@src/core/providers/cache/options/CacheProviderGetOptions'
import { CacheProviderHasOptions } from '@src/core/providers/cache/options/CacheProviderHasOptions'
import { CacheProviderSetOptions } from '@src/core/providers/cache/options/CacheProviderSetOptions'
import { CacheProviderSizeOptions } from '@src/core/providers/cache/options/CacheProviderSizeOptions'

export class DefaultCacheProvider<K, V> implements CacheProvider<K, V> {
  private keyspaces: Collection<string, Collection<K, V>>
  public client: Client

  constructor(client: Client) {
    this.keyspaces = new Collection()
    this.client = client
  }

  async delete(keyspace: string, key: K, options: CacheProviderDeleteOptions = {}): Promise<boolean> {
    const space = this.keyspaces.get(keyspace)

    if (!space) return false

    return space.delete(key)
  }

  async get(keyspace: string, key: K, options: CacheProviderGetOptions = {}): Promise<V | null> {
    const space = this.keyspaces.get(keyspace)

    if (!space) return null

    return space.get(key) ?? null
  }

  async has(keyspace: string, key: K, options: CacheProviderHasOptions = {}): Promise<boolean> {
    const space = this.keyspaces.get(keyspace)

    if (!space) return false

    return space.has(key)
  }

  async set(keyspace: string, key: K, value: V, options: CacheProviderSetOptions = {}): Promise<DefaultCacheProvider<K, V>> {
    let space = this.keyspaces.get(keyspace)

    if (!space) space = this.keyspaces.set(keyspace, new Collection()).get(keyspace)!

    return space.set(key, value) && this
  }

  async size(keyspace?: string, options: CacheProviderSizeOptions = {}): Promise<number> {
    if (keyspace) {
      const space = this.keyspaces.get(keyspace)

      return space?.size ?? 0
    } else {
      return this.keyspaces.map<number>(k => k.size).reduce((previous, current) => previous + current, 0)
    }
  }

}
