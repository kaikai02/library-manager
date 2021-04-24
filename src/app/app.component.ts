import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-manager';
  user$ = this.auth.user$;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/welcome');
      }
    })
  }

  logout(): void {
    this.auth.logout();
  }
}
