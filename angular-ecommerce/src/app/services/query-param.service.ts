import { Injectable } from '@angular/core'

@Injectable()
export class QueryParamService {
  constructor() {}

  extract<T>(param: T): string[] {
    let result = [] as string[]
    for (const name in param) {
      const value = param[name]
      if (value) {
        result = [...result, `${name}=${value}`]
      }
    }

    return result
  }
}
