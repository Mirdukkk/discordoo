/**
 * This decorator makes class methods non overridable in extended classes.
 * When someone extends the class that decorated with @Final('method') and tries to override protected method,
 * and then executes overridden method, the code from the source class will be executed.
 * */
export function Final(...methods: string[]) {
  return function <T extends {new(...props: any[]): any}>(target: T): T {
    return class extends target {
      constructor(...props: any[]) {
        super(...props)

        methods.forEach(method => {
          if (target.prototype[method]) {
            Object.defineProperty(this, method, {
              writable: false,
              configurable: false,
              enumerable: true,
              value: super[method]
            })
          }
        })
      }
    }
  }
}
