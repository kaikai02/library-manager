import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {
  books: Book[];

  constructor() { }

  ngOnInit(): void {}

}
