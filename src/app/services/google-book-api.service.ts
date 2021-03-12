import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class GoogleBookApiService {
  book: Book;

  constructor(private http: HttpClient) { }

  Search(isbn): Observable<void> {
    const encodedURI = encodeURI("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&maxResults=1");
    return this.http.get(encodedURI).pipe(
      map((data: any) => data.items[0])
    );
  }
}
