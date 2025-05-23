import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CharactersService } from '../../../characters/services/characters-service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  isCharactersRoute = false;

  constructor(
    private router :Router,
    private characterService : CharactersService
    //private authService: AuthService
    ){}

    authService = inject(AuthService);



}


