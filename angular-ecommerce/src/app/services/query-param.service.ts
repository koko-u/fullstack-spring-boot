import { Injectable } from '@angular/core'
import { ParamMap } from '@angular/router'
import { HttpParams } from '@angular/common/http'

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

  createHttpParams<T extends ParamLike>(
    param?: T,
    categoryId?: number,
    keyword?: string
  ): HttpParams {
    let params = new HttpParams()
    if (keyword) {
      params = params.append('keyword', keyword)
    }
    if (categoryId) {
      params = params.append('categoryId', categoryId)
    }
    if (param) {
      const page = param.get('page')
      if (page) {
        params = params.append('page', page)
      }
      const size = param.get('size')
      if (size) {
        params = params.append('size', size)
      }
      const sort = param.get('sort')
      if (sort) {
        params = params.append('sort', sort)
      }
    }
    return params
  }
}
