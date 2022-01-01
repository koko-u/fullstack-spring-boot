import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { ProductCategory } from '../shared/models/product-category.model'
import { environment } from '../../environments/environment'
import { QueryParamService } from './query-param.service'
import { QueryParam } from '../shared/models/query-param.model'

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

  getCategories$(param: QueryParam): Observable<ProductCategory[]> {
    const queryParams = this.queryParam.extract(param)
    const url =
      `${environment.endPoint}/product-category` +
      `${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`

    return this.http
      .get<CategoryResponse>(url)
      .pipe(map(({ _embedded: value }) => value.productCategory))
  }
}
