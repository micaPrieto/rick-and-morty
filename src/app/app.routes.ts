import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters',
    loadComponent:() => import('./pages/characters-page/characters-page.component'),

    children: [
      {
        path: 'id',
        loadComponent:() => import('./pages/character-profile-page/character-profile-page.component')
      }
    ]

  },
  {
    path: '**',
    redirectTo: 'characters'
  }
];
