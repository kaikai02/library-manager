import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { GoogleBookApiService } from '../services/google-book-api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  searchForm = new FormGroup({
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  books: Book[];

  constructor(
    private googleBookApiService: GoogleBookApiService,
    private book: BookService
  ) { }

  ngOnInit(): void {
  }

  get isbn(): FormControl {
    return this.searchForm.get('isbn') as FormControl;
  }

  onSearch(): void {
    this.googleBookApiService.Search(this.isbn.value).subscribe((data: any) => {
      this.books = data.map((book: any) => {
        return {
          isbn: book.volumeInfo.industryIdentifiers[0].identifier,
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
          author: book.volumeInfo.authors[0],
          publisher: book.volumeInfo.publisher,
          published: book.volumeInfo.publishedDate,
          isBorrow: false,
        };
      });
    });
  }

  onAddBook(): void {
    this.book.addBook(this.books[0]);
  }

}
