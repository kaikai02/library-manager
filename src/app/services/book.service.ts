import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private store: AngularFirestore,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  addBook(book): Promise<void> {
    const params: Book = {
      id: book.isbn,
      title: book.title,
      description: book.description,
      thumbnail: book.thumbnail,
      author: book.author,
      publisher: book.publisher ? book.publisher : null,
      published: book.published,
      isBorrow: book.isBorrow,
    }
    return this.store.doc(`books/${params.id}`).set(params, { merge: true }).then(() => {
      this.router.navigateByUrl('/');
      this.snackbar.open('登録できました！', null, { duration: 2000 });
    }).catch(() => {
      this.snackbar.open('登録できませんでした', null, { duration: 2000 });
    });
  }

  getBooks(): Observable<Book[]> {
    return this.store.collection<Book>('books').valueChanges();
  }

  getBook(id: number): Observable<Book> {
    return this.store.doc<Book>(`books/${id}`).valueChanges();
  }

  updateBorrow(id: number, isBorrow: boolean): Promise<void> {
    console.log(isBorrow);
    return this.store.doc<Book>(`books/${id}`).update({
      isBorrow: !isBorrow,
    });
  }
}
