import { Component, OnInit, Signal } from '@angular/core';
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
export class ProfileInfoComponent  {

  showImageInput = false;

  constructor(
    private userService: UserService,
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.userService.uploadProfileImage(file).subscribe({
      next: () => {
        alert('Imagen subida con éxito');
        this.showImageInput = false;
      },
      error: () => alert('Hubo un error al subir la imagen'),
    });
  }

  getProfileImageUrl(path: string | undefined): string {
      return path
      ? `http://localhost:3000/${path}`
      : 'assets/images/default-avatar.png'; // Ruta del avatar por defecto
  }

  toggleImageUpload() {
    this.showImageInput = !this.showImageInput;
  }


  get user(): Signal<User | null> {
    return this.userService.user;
  }



}
