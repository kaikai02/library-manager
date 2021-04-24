import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/');
      }
    })
  }

  login() {
    this.auth.login();
  }
}
