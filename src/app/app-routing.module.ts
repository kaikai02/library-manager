import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import { TopPageComponent } from './top-page/top-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TopPageComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'books/:isbn', component: BookDetailComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
