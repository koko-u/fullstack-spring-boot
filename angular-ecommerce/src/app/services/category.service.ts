import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { ProductCategory } from '../shared/models/product-category.model'
import { environment } from '../../environments/environment'
import { ParamLike, QueryParamService } from './query-param.service'

type CategoryResponse = {
  _embedded: {
    productCategory: ProductCategory[]
  }
}

@Injectable()
export class CategoryService {
  constructor(
    private http: HttpClient,
    private queryParam: QueryParamService
  ) {}

  getCategories$<T extends ParamLike>(
    param?: T
  ): Observable<ProductCategory[]> {
    const queryParams = param
      ? this.queryParam.extract(param, 'page', 'size', 'sort')
      : []
    const url =
      `${environment.endPoint}/product-category` +
      `${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`

    return this.http
      .get<CategoryResponse>(url)
      .pipe(map(({ _embedded: value }) => value.productCategory))
  }
}
