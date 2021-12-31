import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../services/product.service'
import { Observable } from 'rxjs'
import { Product } from '../../shared/models/product.model'

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this._products$ = this.productService.getProducts$()
  }
}
