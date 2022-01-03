import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgStringPipesModule } from 'ngx-pipes'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

import { ProductListComponent } from './product-list/product-list.component'
import { PaginationComponent } from './product-list/pagination/pagination.component'
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'

@NgModule({
  declarations: [
    ProductListComponent,
    PaginationComponent,
    ProductListItemComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    NgStringPipesModule,
    FontAwesomeModule,
    RouterModule,
    NgbPaginationModule,
  ],
  exports: [ProductListComponent, ProductDetailComponent],
})
export class ProductModule {}
