import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/book';
import { GoogleBookApiService } from '../services/google-book-api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private googleBookApiService: GoogleBookApiService,
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const isbn = +this.route.snapshot.paramMap.get('isbn');
    this.googleBookApiService.Search(isbn).subscribe((data: any) => {
      this.book = {
        isbn: data[0].volumeInfo.industryIdentifiers[0].identifier,
        title: data[0].volumeInfo.title,
        description: data[0].volumeInfo.description,
        thumbnail: data[0].volumeInfo.imageLinks.smallThumbnail,
        author: data[0].volumeInfo.authors[0],
        publisher: data[0].volumeInfo.publisher,
        published: data[0].volumeInfo.publishedDate,
        isBorrow: false,
      };
    })
  }

}
