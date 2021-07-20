import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../interfaces/book';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { GoogleBookApiService } from '../services/google-book-api.service';
import { OpenbdService } from '../services/openbd.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  uid: string;
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
    private openbd: OpenbdService,
    private auth: AuthService
  ) { }

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
    this.openbd.Search(this.isbn.value).subscribe((data: any) => {
      this.books = data
    });

    this.store.doc(`users/${this.uid}/books/${this.isbn.value}`).ref.get().then((doc) => {
      if (doc.exists) {
        this.isExist = true;
      } else {
        this.isExist = false;
      }
    });
  }

  onAddBook(): void {
    this.book.addBook(this.books[0], this.uid);
  }

}
