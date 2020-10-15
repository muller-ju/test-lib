import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'symphonie-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() nbPages = 1;
  @Input() currentPage = 1;
  @Output() onSelectPage = new EventEmitter<number>();

  isGapBetweenFirstPageAndCurrentTooHigh() {
    return this.currentPage - 1 > 3;
  }

  isGapBetweenLastPageAndCurrentTooHigh() {
    return this.nbPages - this.currentPage > 3;
  }

  ariaGotoPage(number: number) {
    return 'Goto page ' + (this.currentPage + number);
  }

  ariaCurrentPage() {
    return 'Page ' + this.currentPage;
  }

  goTo(pageIndex: number) {
    this.onSelectPage.emit(pageIndex);
  }
}
