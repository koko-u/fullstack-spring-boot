import { Component, OnInit } from '@angular/core'
import {
  catchError,
  concatMap,
  EMPTY,
  from,
  map,
  NEVER,
  Observable,
  tap,
  throwError,
} from 'rxjs'
import { Product } from '../../../shared/models/product.model'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../../services/product.service'
import { Location } from '@angular/common'

@Component({
  selector: 'ec-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product>

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      concatMap((paramMap) => {
        if (paramMap.has('id')) {
          const id = Number(paramMap.get('id'))
          return this.productService.getProductById$(id)
        } else {
          return from(this.router.navigateByUrl('/products')).pipe(
            concatMap((_) => EMPTY)
          )
        }
      })
    )
  }

  goBack() {
    this.location.back()
  }
}
