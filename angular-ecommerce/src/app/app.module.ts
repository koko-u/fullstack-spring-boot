import { NgModule } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'

import { HeaderModule } from './components/header/header.module'
import { FooterModule } from './components/footer/footer.module'
import { SidebarModule } from './components/sidebar/sidebar.module'

import { AppComponent } from './app.component'

import { ProductService } from './services/product.service'
import { ProductModule } from './components/product/product.module'

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
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
