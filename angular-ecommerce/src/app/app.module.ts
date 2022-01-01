import { NgModule } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component'
import { ProductListComponent } from './components/product-list/product-list.component'

import { ProductService } from './services/product.service'
import { NgStringPipesModule } from 'ngx-pipes'

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgStringPipesModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
