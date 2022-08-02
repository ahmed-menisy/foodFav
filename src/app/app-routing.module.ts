import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { FavoritComponent } from './components/favorit/favorit.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'favorit', component: FavoritComponent, title: 'Favorit' },
  { path: 'login', canActivate:[AuthGuard],component: LogInComponent, title: 'LogIn' },
  { path: 'signup',canActivate:[AuthGuard], component: SignUpComponent, title: 'SignUp' },
  { path: 'details/:id', component: DetailsComponent, title: 'Details' },
  { path: '**', component: NotFoundComponent, title: 'NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
