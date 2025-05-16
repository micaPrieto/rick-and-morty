import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import CharacterDetailPageComponent from './characters/pages/character-detail-page/character-detail-page.component';
import CharactersListPageComponent from './characters/pages/characters-list-page/characters-list-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharactersListPageComponent,
  },
  {
    path: 'characters/:id',
    component: CharacterDetailPageComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    component : LoginPageComponent,
  },
   {
    path: 'register',
    component : RegisterPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
