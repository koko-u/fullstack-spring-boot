import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../../services/product.service'
import { map, Observable, switchMap, tap } from 'rxjs'
import { Product } from '../../../shared/models/product.model'
import { ActivatedRoute } from '@angular/router'
import {
  pickCategoryId,
  pickKeyword,
} from '../../../shared/utils/query-param.utils'

@Component({
  selector: 'ec-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>

  noProducts = true

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        return this.productService.searchProducts$(
          pickCategoryId(paramMap),
          pickKeyword(paramMap),
          paramMap
        )
      }),
      tap((products) => {
        this.noProducts = products.length === 0
      })
    )
  }
}
