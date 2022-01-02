import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../services/category.service'
import { Observable } from 'rxjs'
import { ProductCategory } from '../../shared/models/product-category.model'

const sortByCategoryName = {
  has: (name: string) => name === 'sort',
  get: (key: string) => (key === 'sort' ? 'categoryName' : null),
}

@Component({
  selector: 'ec-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories$!: Observable<ProductCategory[]>

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories$(sortByCategoryName)
  }
}
