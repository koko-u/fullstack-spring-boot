import { Component, OnInit } from '@angular/core'
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest, map, Observable } from 'rxjs'
import {
  pickCategoryId,
  pickKeyword,
} from '../../../shared/utils/query-param.utils'

@Component({
  selector: 'ec-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  searchForm = new FormGroup<ControlsOf<{ keyword: string }>>({
    keyword: new FormControl<string>(''),
  })

  get categoryId$(): Observable<number | undefined> {
    return this.route.queryParamMap.pipe(map(pickCategoryId))
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(map(pickKeyword)).subscribe((keyword) => {
      this.searchForm.setValue({
        keyword: keyword ?? '',
      })
    })
  }

  searchByKeyword() {
    if (this.searchForm.invalid) return

    const subscription = combineLatest([
      this.categoryId$,
      this.searchForm.controls.keyword.value$,
    ]).subscribe(async ([categoryId, keyword]) => {
      await this.router.navigate(['/products'], {
        queryParams: { categoryId, keyword },
      })
    })

    subscription.unsubscribe()
  }
}
