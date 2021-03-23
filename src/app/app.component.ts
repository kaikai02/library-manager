import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-manager';
  user$ = this.auth.user$;

  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}
