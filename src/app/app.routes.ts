import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters',
    loadComponent:() => import('./pages/characters-page/characters-page.component'),
  },
  {
    path: 'characters/:id',
    loadComponent:() => import('./pages/character-detail-page/character-detail-page.component')
  },
  {
    path: '**',
    redirectTo: 'characters'
  }
];
