import ModuleInitContext from './ModuleInitContext'
import ModuleMeta from './ModuleMeta'

/**
 * Represents a single module
 * MODULE DEVELOPERS API!
 */
export default interface Module {
  /**
   * Is module a core one or not
   */
  isCore: boolean
  /**
   * Module type
   */
  type: 'gateway' | 'rest' | 'cache' | 'third-party'
  /**
   * Initialization function
   * @param ctx - init context
   */
  init: (ctx: ModuleInitContext) => void | Promise<void>
  /**
   * Meta data for module
   */
  meta: ModuleMeta
  /**
   * Unique module id
   */
  id: string
}