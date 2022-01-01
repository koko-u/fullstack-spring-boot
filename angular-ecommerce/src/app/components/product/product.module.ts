import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgStringPipesModule } from 'ngx-pipes'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ProductListComponent } from './product-list/product-list.component';
import { PaginationComponent } from './pagination/pagination.component'

@NgModule({
  declarations: [ProductListComponent, PaginationComponent],
  imports: [CommonModule, NgStringPipesModule, FontAwesomeModule],
  exports: [ProductListComponent],
})
export class ProductModule {}
