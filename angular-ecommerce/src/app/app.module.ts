import { NgModule } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'

import { HeaderModule } from './components/header/header.module'
import { FooterModule } from './components/footer/footer.module'
import { SidebarModule } from './components/sidebar/sidebar.module'
import { ProductModule } from './components/product/product.module'

import { AppComponent } from './app.component'

import { ProductService } from './services/product.service'
import { CategoryService } from './services/category.service'
import { QueryParamService } from './services/query-param.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    ProductModule,
  ],
  providers: [ProductService, CategoryService, QueryParamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
