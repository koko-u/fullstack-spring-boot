import { Component, OnInit } from '@angular/core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'

@Component({
  selector: 'ec-cart-symbol',
  templateUrl: './cart-symbol.component.html',
  styleUrls: ['./cart-symbol.component.scss'],
})
export class CartSymbolComponent implements OnInit {
  shoppingCartIcon = faShoppingCart

  constructor() {}

  ngOnInit(): void {}
}
