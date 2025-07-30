import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CharactersService } from '../../../characters/services/characters-service';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

   isCharactersRoute = false;
    user: User | null = null;

  constructor(
    private router :Router,
    private characterService : CharactersService,
    public authService: UserService
    ){}


  ngOnInit(): void {
    this.user = this.authService.user();
    console.log('Usuario logueado:', this.user);
  }


}


