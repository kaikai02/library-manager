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

  constructor(private book: BookService) { }

  ngOnInit(): void {}

}
