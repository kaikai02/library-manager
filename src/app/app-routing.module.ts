import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import { TopPageComponent } from './top-page/top-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TopPageComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
