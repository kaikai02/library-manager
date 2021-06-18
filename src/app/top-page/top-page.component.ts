import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {
  books$: Observable<Book[]> = this.book.getBooks();
  length: number;
  pageSize: number = 5;
  start: number = 0;
  end: number = 5;

  constructor(private book: BookService) { }

  ngOnInit(): void {
    this.getBooksLength();
  }

  getBooksLength(): void {
    this.books$.subscribe(books => {
      this.length = books.length;
    })
  }

  setPaginatorData(event): void {
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
  }

}
