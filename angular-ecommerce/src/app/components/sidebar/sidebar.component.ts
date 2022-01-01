import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../services/category.service'
import { Observable } from 'rxjs'
import { ProductCategory } from '../../shared/models/product-category.model'

@Component({
  selector: 'ec-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private _categories$: Observable<ProductCategory[]> | undefined
  get categories$(): Observable<ProductCategory[]> {
    if (this._categories$ === undefined) throw new Error()
    return this._categories$
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this._categories$ = this.categoryService.getCategories$({
      sort: 'categoryName',
    })
  }
}
