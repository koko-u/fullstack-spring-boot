import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { map, Observable } from 'rxjs'
import { Product } from '../shared/models/product.model'

type ProductsResponse = {
  _embedded: {
    products: Product[]
  }
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts$(): Observable<Product[]> {
    return this.http
      .get<ProductsResponse>(`${environment.endPoint}/products`)
      .pipe(map(({ _embedded: value }) => value.products))
  }
}
