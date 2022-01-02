import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../../services/product.service'
import { map, Observable, switchMap } from 'rxjs'
import { Product } from '../../../shared/models/product.model'
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'ec-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.products$ = this.route.queryParamMap.pipe(
      map((paramMap) => {
        const categoryId = pickCategoryId(paramMap)
        return [categoryId, paramMap] as [number | undefined, ParamMap]
      }),
      switchMap(([categoryId, paramMap]) => {
        if (categoryId) {
          return this.productService.getProductsByCategory$(
            categoryId,
            paramMap
          )
        } else {
          return this.productService.getProducts$(paramMap)
        }
      })
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
