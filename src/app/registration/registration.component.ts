import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../interfaces/book';
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
  book: Book;

  constructor(private googleBookApiService: GoogleBookApiService) { }

  ngOnInit(): void {
  }

  get isbn(): FormControl {
    return this.searchForm.get('isbn') as FormControl;
  }

  onSearch(): void {
    this.googleBookApiService.Search(this.isbn.value).subscribe((data: any) => {
      this.book = {
        isbn: data.volumeInfo.industryIdentifiers[0].identifier,
        title: data.volumeInfo.title,
        description: data.volumeInfo.description,
        thumbnail: data.volumeInfo.imageLinks.smallThumbnail,
        author: data.volumeInfo.authors[0],
        publisher: data.volumeInfo.publisher,
        published: data.volumeInfo.publishedDate,
      };
    });
  }

}
