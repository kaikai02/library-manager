import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { GoogleBookApiService } from '../services/google-book-api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  isbn = +this.route.snapshot.paramMap.get('isbn')
  book$: Observable<Book> = this.bookService.getBook(this.isbn);

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void { }

  onChangeBorrow(isBorrow: boolean): void {
    this.bookService.updateBorrow(this.isbn, isBorrow);
  }

}
