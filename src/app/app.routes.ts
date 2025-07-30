import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { BootstrapComponent } from '../assets/bootstrap/bootstrap.component';
import ProfileComponent from './profile/profile.component';
import { EpisodesListPageComponent } from './episodes/pages/episodes-list-page/episodes-list-page.component';

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
    component:EpisodesListPageComponent,
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
    //canMatch:  [authLogOutGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    //loadChildren : () => import ('./profile/profile.component'),
    canActivate:  [AuthenticatedGuard],
  },
  {
    path: '',
    loadComponent : () => import ('./shared/pages/home-page/home-page.component'),
    pathMatch: 'full', // Solo redirige si la URL está completamente vacía
    canActivate:  [AuthenticatedGuard]
  },
    {
    path: 'bootstrap',
    component: BootstrapComponent
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
