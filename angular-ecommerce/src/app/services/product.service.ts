import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { map, Observable } from 'rxjs'
import { Product } from '../shared/models/product.model'
import { QueryParam } from '../shared/models/query-param.model'

type ProductsResponse = {
  _embedded: {
    products: Product[]
  }
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  // getProducts$(): Observable<Product[]> {
  //   return this.http
  //     .get<ProductsResponse>(`${environment.endPoint}/products`)
  //     .pipe(map(({ _embedded: value }) => value.products))
  // }

  getProducts$(
    param: QueryParam & { categoryId: number | undefined }
  ): Observable<Product[]> {
    return this.http
      .get<ProductsResponse>(createUrlFrom(param))
      .pipe(map(({ _embedded: value }) => value.products))
  }

  getProductsByCategoryId$(categoryId: number): Observable<Product[]> {
    return this.http
      .get<ProductsResponse>(
        `${environment.endPoint}/products` +
          `/search/findByCategoryId?categoryId=${categoryId}`
      )
      .pipe(map(({ _embedded: value }) => value.products))
  }
}

const createUrlFrom = (
  param: QueryParam & { categoryId: number | undefined }
): string => {
  let noQueryParam = true
  let url = `${environment.endPoint}/products`
  if (param.categoryId) {
    url += `/search/findByCategoryId?categoryId=${param.categoryId}`
    noQueryParam = false
  }
  if (param.page) {
    url += `${noQueryParam ? '?' : '&'}page=${param.page}`
    noQueryParam = false
  }
  if (param.size) {
    url += `${noQueryParam ? '?' : '&'}size=${param.size}`
    noQueryParam = false
  }
  if (param.sort) {
    url += `${noQueryParam ? '?' : '&'}sort=${param.sort}`
    noQueryParam = false
  }
  return url
}
