import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CharactersService } from '../../../characters/services/characters-service';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

   isCharactersRoute = false;
    user: User | null = null;

  constructor(
    public userService: UserService
    ){}


  ngOnInit(): void {
    this.user = this.userService.user();
    console.log('Usuario logueado:', this.user);
  }
}


