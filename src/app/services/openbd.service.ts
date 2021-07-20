import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class OpenbdService {

  constructor(private http: HttpClient) { }

  Search(isbn): Observable<any> {
    const encodedURI = encodeURI("https://api.openbd.jp/v1/get?isbn=" + isbn);
    return this.http
      .get(encodedURI)
      .pipe(
        map((result) => result),
        catchError(this.handleError)
      )
      .pipe(
        map((data: any) => {
          if (data?.length){
            return data.map((book: any) => {
              return {
                isbn: book.summary.isbn,
                title: book.summary.title,
                description: book.onix.CollateralDetail.TextContent?.[0].Text || null,
                thumbnail: book.summary.cover,
                author: book.summary.author,
                publisher: book.summary.publisher,
                published: book.summary.pubdate,
                isBorrow: false,
              }
            })
          }
        })
      )
  }

  handleError(err: any): Observable<any> {
    console.log('Error occured.', err);
    return throwError(err);
  }
}
