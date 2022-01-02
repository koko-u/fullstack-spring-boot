import { Injectable } from '@angular/core'
import { ParamMap } from '@angular/router'

export type ParamLike = {
  has(key: string): boolean
  get(key: string): string | null
}

@Injectable()
export class QueryParamService {
  constructor() {}

  extract<T extends ParamLike>(param: T, ...names: string[]): string[] {
    let result = [] as string[]
    for (const name of names) {
      if (param.has(name)) {
        const value = param.get(name)
        if (value) {
          result = [...result, `${name}=${value}`]
        }
      }
    }

    return result
  }
}
