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
    const params = this.queryParam.createHttpParams(param)
    const url = `${environment.endPoint}/product-category`

    return this.http
      .get<CategoryResponse>(url, { params })
      .pipe(map(({ _embedded: value }) => value.productCategory))
  }
}
