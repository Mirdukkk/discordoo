import { CacheNamespace } from '@src/core/providers/cache/CacheNamespace'

/** Represents a CacheProvider. Bound to Client context */
export type CacheProvider<T extends CacheNamespace = CacheNamespace> = (namespace: string) => T
