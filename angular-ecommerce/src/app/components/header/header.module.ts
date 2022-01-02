import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'

import { HeaderDesktopComponent } from './desktop/header-desktop.component'
import { SearchFormComponent } from './search-form/search-form.component'
import { CartSymbolComponent } from './cart-symbol/cart-symbol.component'

@NgModule({
  declarations: [
    HeaderDesktopComponent,
    SearchFormComponent,
    CartSymbolComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [HeaderDesktopComponent],
})
export class HeaderModule {}
