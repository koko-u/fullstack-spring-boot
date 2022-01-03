import { Component, OnDestroy, OnInit } from '@angular/core'
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest, map, Observable, Subscription } from 'rxjs'
import { QueryParamService } from '../../../services/query-param.service'

@Component({
  selector: 'ec-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  /**
   * 検索キーワードを入力するフォームです
   */
  searchForm = new FormGroup<ControlsOf<{ keyword: string }>>({
    keyword: new FormControl<string>(''),
  })

  private _subscription: Subscription | undefined

  constructor(
    private queryParam: QueryParamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * 画面を表示したタイミングでクエリパラメータにキーワードが含まれていれば
   * その内容をキーワード入力フォームにも反映します
   */
  ngOnInit(): void {
    this._subscription = this.route.queryParamMap
      .pipe(map((queryParam) => this.queryParam.pickKeyword(queryParam)))
      .subscribe((keyword) => {
        this.searchForm.setValue({
          keyword: keyword ?? '',
        })
      })
  }

  /**
   * ngOnInit で購読した queryParamMap を解除します
   */
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  /**
   * 指定した検索キーワードをクエリパラメータに追加して遷移します
   */
  searchByKeyword() {
    if (this.searchForm.invalid) return

    const categoryId$ = this.route.queryParamMap.pipe(
      map((queryParam) => this.queryParam.pickCategoryId(queryParam))
    )

    const subscription = combineLatest([
      categoryId$,
      this.searchForm.controls.keyword.value$,
    ]).subscribe(async ([categoryId, keyword]) => {
      await this.router.navigate(['/products'], {
        queryParams: { categoryId, keyword },
      })
    })

    subscription.unsubscribe()
  }
}
