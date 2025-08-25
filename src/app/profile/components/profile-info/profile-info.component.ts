import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { User } from '../../../auth/interfaces/user.interface';
import { UserService } from '../../../auth/services/user.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-info',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent  {

  showImageInput = false;

  constructor(
    private userService: UserService,
     private snackBar : MatSnackBar,
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.userService.uploadProfileImage(file).subscribe({
      next: () => {

        this.openSnackBar('Imagen subida con éxito', 'Cerrar','snackbar-success');
        this.showImageInput = false;
      },
      error: () =>this.openSnackBar('Ha ocurrido un error al subir la imagen', 'Cerrar','snackbar-error'),
    });
  }

  getProfileImageUrl(path: string | undefined): string {
      return path
      ? `https://back-rickymorty.onrender.com/${path}`
      : 'assets/images/default-avatar.png'; // Ruta del avatar por defecto
  }

  toggleImageUpload() {
    this.showImageInput = !this.showImageInput;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-avatar2.jpg';
  }


  get user(): Signal<User | null> {
    return this.userService.user;
  }


  getFormattedAddress(): string {
    const addr = this.user()?.address;
    if (!addr) return ' - ';

    const parts = [];

    if (addr.street) parts.push(addr.street);

    // Para ciudad y código postal, los agrupamos juntos si existen
    if (addr.city && addr.cp) {
      parts.push(`${addr.city} (${addr.cp})`);
    } else if (addr.city) {
      parts.push(addr.city);
    } else if (addr.cp) {
      parts.push(`(${addr.cp})`);
    }

    if (addr.location) parts.push(addr.location);
    if (addr.country) parts.push(addr.country);

    return parts.join(', ');
  }


   getFormattedBirthday(): string {
    const birthday = this.user()?.birthday;
    if (!birthday) return '-';

    // Usar el pipe de fecha directamente
    const date = new Date(birthday);
    return date.toLocaleDateString('es-ES'); // Formato español: dd/mm/aaaa
  }

  openSnackBar(message: string, action: string, panelClass: string) {
      this.snackBar.open(message, action, {
       duration: 3000,
       panelClass: panelClass
      });
  }


}
