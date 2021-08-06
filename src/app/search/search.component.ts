import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  uid: string;
  searchForm = new FormGroup({
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  book$: Observable<Book>;
  isSearched: boolean;

  constructor(
    private auth: AuthService,
    private bookService: BookService
  ) {
    this.isSearched = false;
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
    })
  }

  get isbn(): FormControl {
    return this.searchForm.get('isbn') as FormControl;
  }

  onSearch(): void {
    this.book$ = this.bookService.getBook(this.isbn.value, this.uid);
    this.isSearched = true;
  }

}
