import { Component, OnInit } from '@angular/core'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'

@Component({
  selector: 'ec-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  get angleLeftIcon(): IconDefinition {
    return faAngleLeft
  }
  get angleRightIcon(): IconDefinition {
    return faAngleRight
  }

  constructor() {}

  ngOnInit(): void {}
}
