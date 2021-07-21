import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  isbn = +this.route.snapshot.paramMap.get('isbn')
  book$: Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.onGetBook(this.auth.uid);
  }

  onGetBook(uid: string): void {
    this.book$ = this.bookService.getBook(this.isbn, uid);
  }

  onChangeBorrow(isBorrow: boolean): void {
    this.bookService.updateBorrow(this.isbn, this.auth.uid, isBorrow);
  }

}
