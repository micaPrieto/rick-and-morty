import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import ProfileComponent from './profile/pages/user-profile-page/user-profile-page.component';

export const routes: Routes = [
  {
    path: 'characters',
    loadComponent : () => import ('./characters/pages/characters-list-page/characters-list-page.component'),
    canActivate:  [AuthenticatedGuard],
  },
  {
    path: 'characters/:id',
    loadComponent : () => import ('./characters/pages/character-detail-page/character-detail-page.component'),
    canActivate:  [AuthenticatedGuard],
  },
  {
    path: 'episodes',
    loadComponent : () => import ('./episodes/pages/episodes-list-page/episodes-list-page.component'),
    canActivate:  [AuthenticatedGuard],
  },
  {
    path: 'episodes/:id',
    loadComponent : () => import ('./episodes/pages/episode-detail-page/episode-detail-page.component'),
    canActivate:  [AuthenticatedGuard],
  },
  {
    path: 'auth',
    loadChildren : () => import ('./auth/auth.routes'),
    canActivate:  [NotAuthenticatedGuard],
  },
  {
    path: 'profile',
    loadComponent : () => import ('./profile/pages/user-profile-page/user-profile-page.component'),
    canActivate:  [AuthenticatedGuard],
  },
    {
      path: 'edit-profile',
      loadComponent : () => import ('./profile/components/edit-profile/edit-profile.component'),
      canActivate:  [AuthenticatedGuard],
    },
  {
    path: '',
    redirectTo: 'characters',
     pathMatch: 'full', // Solo redirige si la URL está completamente vacía
  },
  {
    path: 'not-found',
    loadComponent : () => import ('./shared/pages/not-found/not-found.component'),
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },

];
