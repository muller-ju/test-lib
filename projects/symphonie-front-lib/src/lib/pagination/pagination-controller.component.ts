import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'symphonie-pagination-controller',
  templateUrl: './pagination-controller.component.html'
})
export class PaginationControllerComponent implements OnInit, DoCheck {

  @Input() maxResult: number = 5;
  @Input() elements: any[] = [];
  @Output() displayedElementsChange = new EventEmitter<any[]>();

  public nbPages = 1;
  public currentPage = 1;

  private previous: string;

  ngDoCheck(): void {
    // verify if items were sorted
    const jsonElements = JSON.stringify(this.elements);
    if (jsonElements != this.previous) {
      this.previous = jsonElements;
      this.ngOnChanges();
    }
  }

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    if (this.elements && this.elements.length > 0) {
      this.nbPages = Math.trunc(this.elements.length / this.maxResult) + ((this.elements.length % this.maxResult === 0) ? 0 : 1);
      if (this.nbPages > 1) {
        this.goTo(1);
      } else {
        this.displayedElementsChange.emit([...this.elements]);
      }
    } else {
      this.nbPages = 1;
      this.currentPage = 1;
      this.displayedElementsChange.emit([]);
    }
  }

  goTo(page: number) {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.maxResult;
    const end = this.currentPage * this.maxResult;
    this.displayedElementsChange.emit(this.elements.slice(start, end));
  }

  gotoPage(pageIndex: number ) {
    this.goTo(pageIndex);
  }
}
