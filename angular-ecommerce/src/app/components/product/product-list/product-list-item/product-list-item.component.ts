import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../../../shared/models/product.model'
import { Router } from '@angular/router'

@Component({
  selector: 'ec-product-list-item[product]',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent {
  @Input() product!: Product

  constructor(private router: Router) {}

  onClick() {
    console.log('click grid')
  }

  addCart() {
    console.log('add cart')
  }

  navigateToDetailPage() {
    this.router.navigate(['products', this.product.id])
  }
}
