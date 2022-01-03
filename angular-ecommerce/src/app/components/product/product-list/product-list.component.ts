import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../../services/product.service'
import { map, Observable, shareReplay, switchMap, tap } from 'rxjs'
import { Product } from '../../../shared/models/product.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Page } from '../../../shared/models/pagination.model'
import { QueryParam } from '../../../shared/models/query-param.model'
import { QueryParamService } from '../../../services/query-param.service'

@Component({
  selector: 'ec-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  /**
   * 商品一覧に表示するべき商品リストです
   *
   * ルートの状態が変化するに応じてバックエンドから取得した商品の一覧が格納されます
   */
  products$!: Observable<Product[]>

  /**
   * ページネーションに渡すべき現在のページ情報です
   *
   * バックエンドから商品の一覧とともに返却されるページ情報が格納されます
   */
  page$!: Observable<Page>

  /**
   * 商品の有無を示すフラグです。
   *
   * $products の内容が変化するたびに、副作用として商品のリストが空であれば
   * true そうでなければ false がセットされます
   */
  noProducts = true

  constructor(
    private productService: ProductService,
    private queryParam: QueryParamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts()
  }

  /**
   * ページネーションの現在のページが変化したら、
   * クエリパラメータに変更後の page パラメータを追加します
   *
   * @param queryParam
   */
  async onPageChange(queryParam: QueryParam) {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParam,
      queryParamsHandling: 'merge',
    })
  }

  /**
   * クエリパラメータの変化に応じて、$products と $page を設定します
   *
   * @private
   */
  private fetchProducts() {
    const shared$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => this.productService.searchProducts$(paramMap)),
      shareReplay(2)
    )

    this.products$ = shared$.pipe(
      map(({ products }) => products),
      tap((products) => {
        this.noProducts = products.length === 0
      })
    )

    this.page$ = shared$.pipe(map(({ page }) => page))
  }
}
