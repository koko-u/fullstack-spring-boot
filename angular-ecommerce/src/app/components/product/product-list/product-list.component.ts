import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../../services/product.service'
import { concatMap, map, Observable, switchMap, tap } from 'rxjs'
import { Product } from '../../../shared/models/product.model'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { QueryParam } from '../../../shared/models/query-param.model'

@Component({
  selector: 'ec-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private _products$: Observable<Product[]> | undefined
  get products$(): Observable<Product[]> {
    if (this._products$ === undefined) throw new Error()
    return this._products$
  }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._products$ = this.route.queryParamMap.pipe(
      map((paramMap) => {
        const categoryId = pickCategoryId(paramMap)
        const queryParam = pickQueryParam(paramMap)
        return {
          categoryId,
          ...queryParam,
        }
      }),
      switchMap((param) => this.productService.getProducts$(param))
    )
  }
}

const pickCategoryId = (paramMap: ParamMap): number | undefined => {
  if (paramMap.has('categoryId')) {
    const categoryId = Number(paramMap.get('categoryId'))
    if (!isNaN(categoryId)) {
      return categoryId
    }
  }
  return undefined
}

const pickQueryParam = (paramMap: ParamMap): QueryParam => {
  let param: QueryParam = {}
  if (paramMap.has('page')) {
    const page = Number(paramMap.get('page'))
    if (!isNaN(page)) {
      param = {
        ...param,
        page,
      }
    }
  }
  if (paramMap.has('size')) {
    const size = Number(paramMap.get('size'))
    if (!isNaN(size)) {
      param = {
        ...param,
        size,
      }
    }
  }
  if (paramMap.has('sort')) {
    const sort = paramMap.get('sort')
    if (sort) {
      param = {
        ...param,
        sort,
      }
    }
  }

  return param
}
