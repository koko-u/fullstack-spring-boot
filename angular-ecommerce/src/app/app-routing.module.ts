import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductListComponent } from './components/product/product-list/product-list.component'
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component'

const routes: Routes = [
  { path: 'products/:id', component: ProductDetailComponent },
  // all products -> /products
  // with categories -> /products?categoryId=1
  // with keywords -> /products?categoryId=1&keyword=python
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
