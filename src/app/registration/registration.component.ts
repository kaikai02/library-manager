import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { GoogleBookApiService } from '../services/google-book-api.service';
import { OpenbdService } from '../services/openbd.service';

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
  isExist: boolean;

  constructor(
    private googleBookApiService: GoogleBookApiService,
    private book: BookService,
    private store: AngularFirestore,
    private openbd: OpenbdService
  ) { }

  ngOnInit(): void {
  }

  get isbn(): FormControl {
    return this.searchForm.get('isbn') as FormControl;
  }

  onSearch(): void {
    this.openbd.Search(this.isbn.value).subscribe((data: any) => {
      this.books = data.map((book: any) => {
        return {
          isbn: book.summary.isbn,
          title: book.summary.title,
          description: book.onix.CollateralDetail.TextContent[0].Text,
          thumbnail: book.summary.cover,
          author: book.summary.author,
          publisher: book.summary.publisher,
          published: book.summary.pubdate,
          isBorrow: false,
        };
      });
    });

    this.store.doc(`books/${this.isbn.value}`).ref.get().then((doc) => {
      if (doc.exists) {
        this.isExist = true;
      } else {
        this.isExist = false;
      }
    });
  }

  onAddBook(): void {
    this.book.addBook(this.books[0]);
  }

}
