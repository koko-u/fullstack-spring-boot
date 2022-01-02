import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductListComponent } from './components/product/product-list/product-list.component'
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component'

/**
 * GET /products                           - get all products (with pagination)
 * GET /products/00                        - get a single product
 * GET /products?categoryId=00             - get all products with the category
 * GET /products?categoryId=00&keyword=XXX - get products which matches the given keyword
 *
 */
const routes: Routes = [
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
