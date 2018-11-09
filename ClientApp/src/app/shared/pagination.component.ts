import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pagination',
  template: `
    <nav *ngIf="totalItems > pageSize">
        <ul class="pagination">
            <li [class.disabled]="currentPage == 1">
                <a (click)="previous()" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
                <a>{{ page }}</a>
            </li>
            <li [class.disabled]="currentPage == pages.length">
                <a (click)="next()" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
`
})
export class PaginationComponent implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('total-items') totalItems;
  // tslint:disable-next-line:no-input-rename
  @Input('page-size') pageSize = 10;
  // tslint:disable-next-line:no-output-rename
  @Output('page-changed') pageChanged = new EventEmitter();
  pages: any[];
  currentPage = 1;

  ngOnChanges() {
    this.currentPage = 1;

    const pagesCount = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      this.pages.push(i);
    }

    console.log(this);
  }

  changePage(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  previous() {
    // tslint:disable-next-line:triple-equals
    if (this.currentPage == 1) {
      return;
    }

    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    // tslint:disable-next-line:triple-equals
    if (this.currentPage == this.pages.length) {
      return;
    }

    this.currentPage++;
    console.log('next', this);
    this.pageChanged.emit(this.currentPage);
  }
}
