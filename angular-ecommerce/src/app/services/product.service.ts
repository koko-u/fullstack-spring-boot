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

  getProducts$<T extends ParamLike>(param: T): Observable<Product[]> {
    const queryParams = this.queryParam.extract(param, 'page', 'size', 'sort')
    const url =
      `${environment.endPoint}/products` +
      `${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`

    return this.http
      .get<ProductsResponse>(url)
      .pipe(map(({ _embedded: value }) => value.products))
  }

  getProductsByCategory$<T extends ParamLike>(
    categoryId: number,
    param?: T
  ): Observable<Product[]> {
    const queryParams = param ? this.queryParam.extract(param) : []
    const url =
      `${environment.endPoint}/product-category/${categoryId}/products` +
      `${queryParams ? '?' + queryParams.join('&') : ''}`

    return this.http
      .get<ProductsResponse>(url)
      .pipe(map(({ _embedded: value }) => value.products))
  }
}
