import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { map, Observable } from 'rxjs'
import { Product } from '../shared/models/product.model'
import { ParamLike, QueryParamService } from './query-param.service'
import { Page } from '../shared/models/pagination.model'

type ProductsResponse = {
  _embedded: {
    products: Product[]
  }
}
type PageResponse = {
  page: Page
}

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient,
    private queryParam: QueryParamService
  ) {}

  searchProducts$<T extends ParamLike>(
    param?: T
  ): Observable<{ products: Product[]; page: Page }> {
    const params = this.queryParam.createHttpParams(param)
    const url = `${environment.endPoint}/products/search/queryByKeyword`

    return this.http
      .get<ProductsResponse & PageResponse>(url, { params })
      .pipe(
        map((res) => ({ products: res._embedded.products, page: res.page }))
      )
  }

  getProductById$(id: number): Observable<Product> {
    const url = `${environment.endPoint}/products/${id}`
    return this.http.get<Product>(url)
  }
}
