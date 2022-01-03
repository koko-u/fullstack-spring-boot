import { Injectable } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import { QueryParam } from '../shared/models/query-param.model'

export interface ParamLike {
  has(key: string): boolean
  get(key: string): string | null
  readonly keys: string[]
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

  createHttpParams<T extends ParamLike>(param?: T): HttpParams {
    const categoryId = param ? this.pickCategoryId(param) : undefined
    const keyword = param ? this.pickKeyword(param) : undefined

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

  merge<T1 extends ParamLike, T2 extends ParamLike>(
    param1: T1,
    param2: T2
  ): QueryParam {
    const param = new QueryParam()
    // page
    const page1 = Number(param1.get('page'))
    const page2 = Number(param2.get('page'))
    if (!isNaN(page2)) {
      param.page = page2
    } else if (!isNaN(page1)) {
      param.page = page1
    }
    // size
    const size1 = Number(param1.get('size'))
    const size2 = Number(param2.get('size'))
    if (!isNaN(size2)) {
      param.size = size2
    } else if (!isNaN(size1)) {
      param.size = size1
    }
    // sort
    const sort1 = param1.get('sort')
    const sort2 = param2.get('sort')
    if (sort2) {
      param.sort = sort2
    } else if (sort1) {
      param.sort = sort1
    }
    return param
  }

  pickCategoryId<T extends ParamLike>(paramMap: T): number | undefined {
    if (paramMap.has('categoryId')) {
      const categoryId = Number(paramMap.get('categoryId'))
      if (!isNaN(categoryId)) {
        return categoryId
      }
    }
    return undefined
  }

  pickKeyword<T extends ParamLike>(paramMap: T): string | undefined {
    if (paramMap.has('keyword')) {
      const keyword = paramMap.get('keyword')
      if (keyword) {
        return keyword
      }
    }
    return undefined
  }
}
