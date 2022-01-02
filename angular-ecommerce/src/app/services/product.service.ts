import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { map, Observable } from 'rxjs'
import { Product } from '../shared/models/product.model'
import { ParamLike, QueryParamService } from './query-param.service'

type ProductsResponse = {
  _embedded: {
    products: Product[]
  }
}

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient,
    private queryParam: QueryParamService
  ) {}

  searchProducts$<T extends ParamLike>(
    categoryId?: number,
    keyword?: string,
    param?: T
  ): Observable<Product[]> {
    const url = this.getUrl(categoryId, keyword, param)
    return this.http
      .get<ProductsResponse>(url)
      .pipe(map(({ _embedded: value }) => value.products))
  }

  // getProducts$<T extends ParamLike>(param: T): Observable<Product[]> {
  //   const queryParams = this.queryParam.extract(param, 'page', 'size', 'sort')
  //   const url =
  //     `${environment.endPoint}/products` +
  //     `${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`
  //
  //   return this.http
  //     .get<ProductsResponse>(url)
  //     .pipe(map(({ _embedded: value }) => value.products))
  // }
  //
  // getProductsByCategory$<T extends ParamLike>(
  //   categoryId: number,
  //   param?: T
  // ): Observable<Product[]> {
  //   const queryParams = param ? this.queryParam.extract(param) : []
  //   const url =
  //     `${environment.endPoint}/product-category/${categoryId}/products` +
  //     `${queryParams ? '?' + queryParams.join('&') : ''}`
  //
  //   return this.http
  //     .get<ProductsResponse>(url)
  //     .pipe(map(({ _embedded: value }) => value.products))
  // }

  private getUrl<T extends ParamLike>(
    categoryId?: number,
    keyword?: string,
    param?: T
  ): string {
    const queryParams = param
      ? this.queryParam.extract(param, 'page', 'size', 'sort')
      : []

    let baseUrl = ''

    if (keyword) {
      baseUrl = `${environment.endPoint}/products/search/queryByKeyword?keyword=${keyword}`
      const categoryCond = categoryId ? `&categoryId=${categoryId}` : ''
      const pagingCond =
        queryParams.length > 0 ? `&${queryParams.join('&')}` : ''
      return `${baseUrl}${categoryCond}${pagingCond}`
    } else {
      if (categoryId) {
        baseUrl = `${environment.endPoint}/product-category/${categoryId}/products`
      } else {
        baseUrl = `${environment.endPoint}/products`
      }
      const pagingCond =
        queryParams.length > 0 ? `&${queryParams.join('&')}` : ''
      return `${baseUrl}${pagingCond}`
    }
  }
}
