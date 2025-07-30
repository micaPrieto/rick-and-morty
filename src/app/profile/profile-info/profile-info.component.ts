import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../../characters/interfaces/character.interface';
import { CharactersService } from '../../characters/services/characters-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { translaterCharacterInfo } from '../../characters/pipes/translater-character-info.pipe';
import { User } from '../../auth/interfaces/user.interface';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-profile-info',
  imports: [CommonModule],
  templateUrl: './profile-info.component.html'
})
export class ProfileInfoComponent {

    user : User | null = null;

    constructor(
      private userService: UserService,
    ) {}

    ngOnInit(): void {
      this.user = this.userService.user();
    }

}
