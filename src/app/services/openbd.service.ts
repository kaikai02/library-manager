import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class OpenbdService {

  constructor(private http: HttpClient) { }

  Search(isbn): Observable<any> {
    const encodedURI = encodeURI("https://api.openbd.jp/v1/get?isbn=" + isbn);
    return this.http.get(encodedURI);
  }
}
