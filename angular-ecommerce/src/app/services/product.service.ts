import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { EMPTY, map, Observable } from 'rxjs'
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
    const { url, params } = this.getUrl(param, categoryId, keyword)
    return this.http
      .get<ProductsResponse>(url, { params })
      .pipe(map(({ _embedded: value }) => value.products))
  }

  private getUrl<T extends ParamLike>(
    param?: T,
    categoryId?: number,
    keyword?: string
  ): { url: string; params: HttpParams } {
    const params = this.queryParam.createHttpParams(param, categoryId, keyword)

    let url: string
    if (keyword) {
      url = `${environment.endPoint}/products/search/queryByKeyword`
    } else {
      if (categoryId) {
        url = `${environment.endPoint}/product-category/${categoryId}/products`
      } else {
        url = `${environment.endPoint}/products`
      }
    }

    return { url, params }
  }

  getProductById$(id: number): Observable<Product> {
    const url = `${environment.endPoint}/products/${id}`
    return this.http.get<Product>(url)
  }
}
