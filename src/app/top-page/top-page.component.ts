import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {
  books$: Observable<Book[]>;
  length: number;
  pageSize: number = 5;
  start: number = 0;
  end: number = 5;

  pageEvent: PageEvent;

  constructor(
    private book: BookService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.getBooks(user.uid);
    })
  }

  getBooks(uid: string): void {
    this.books$ = this.book.getBooks(uid);
    this.books$.subscribe(books => {
      this.length = books.length;
    })
  }

  setPaginatorData(event: PageEvent): PageEvent {
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
    return event;
  }

}
