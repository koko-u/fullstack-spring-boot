import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { Page } from '../../../../shared/models/pagination.model'
import { QueryParam } from '../../../../shared/models/query-param.model'

@Component({
  selector: 'ec-pagination[page]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('page') page$!: Observable<Page>

  /**
   * 現在のページが変更されたことを親コンポーネントに伝達します
   */
  @Output()
  pageChanged = new EventEmitter<QueryParam>()

  constructor() {}

  /**
   * ngbPagination からページが変更されたことを受け取って、
   * クエリパラメータとしては 0 オリジンのページ数に変換して親コンポーネントに通知します
   *
   * @param newPage
   */
  onPageChange(newPage: number) {
    const queryParam = new QueryParam()
    queryParam.page = newPage - 1
    this.pageChanged.emit(queryParam)
  }
}
