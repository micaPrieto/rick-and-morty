import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { User } from '../../auth/interfaces/user.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../auth/services/user.service';
import { Address } from '../../auth/interfaces/address.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtils } from '../../auth/utils/form.utils';

@Component({
  selector: 'app-profile-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export default class ProfileEditComponent  implements OnInit{

    constructor(
      private fb : FormBuilder,
      private snackBar : MatSnackBar,
      private router : Router,
      private userService : UserService
   ) { }

  isSaving = signal(false);

  profileForm!: FormGroup;
  formUtils = FormUtils;

  showImageInput = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.userService.uploadProfileImage(file).subscribe({
      next: () => {
        this.openSnackBar('Imagen subida con éxito','Cerrar','snackbar-error');
        this.showImageInput = false;
      },
      error: () => this.openSnackBar('Ha ocurrido un error al subir la imagen','Cerrar','snackbar-success'),
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.loadUserData();
  }

  private initializeForm() {
    this.profileForm = this.fb.group({
       fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [{value: '', disabled: true}],
      phone: ['', [Validators.pattern(this.formUtils.telPattern)]],
      birthday: [''],
      address: this.fb.group({
        street: ['', [ Validators.maxLength(50)]],
        city: ['', [ Validators.maxLength(50)]],
        location: ['', [ Validators.maxLength(50)]],
        country: ['', [ Validators.maxLength(50)]],
        cp: ['', [ Validators.minLength(4), Validators.maxLength(4)]],
      })
    });
  }

  get user() {
    return this.userService.user;
  }

  private loadUserData() {
    const currentUser = this.user();
    if (currentUser) {
      this.profileForm.patchValue({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        birthday: currentUser.birthday ? this.formatDateForInput(currentUser.birthday) : '',
        address: {
          street: currentUser.address?.street || '',
          city: currentUser.address?.city || '',
          cp: currentUser.address?.cp || '',
          location: currentUser.address?.location || '',
          country: currentUser.address?.country || ''
        }
      });
    }
  }

   private formatDateForInput(date: Date | string): string {
    try {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      if (typeof date === 'string') {
        return new Date(date).toISOString().split('T')[0];
      }
      return '';
    } catch {
      return '';
    }
  }

  getProfileImageUrl(path: string | undefined): string {
      return path
      ? `https://back-rickymorty.onrender.com/${path}`
      : 'assets/images/default-avatar.png';
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-avatar2.jpg';
  }

  toggleImageUpload() {
    this.showImageInput = !this.showImageInput;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isAddressFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm?.get(`address.${fieldName}`);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm?.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return `${this.getFieldLabel(fieldName)} es requerido`;
    if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['pattern']) return `Formato de ${this.getFieldLabel(fieldName).toLowerCase()} inválido`;

    return 'Campo inválido';
  }

  getAddressFieldError(fieldName: string): string {
    const field = this.profileForm?.get(`address.${fieldName}`);
    if (!field || !field.errors) return '';

    if (field.errors['pattern']) return 'Código postal inválido';

    return 'Campo inválido';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'fullName': 'Nombre completo',
      'phone': 'Teléfono',
      'birthday': 'Fecha de nacimiento'
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.saveProfile();
  }

 saveProfile() {
    if (this.profileForm.invalid) return;

    this.isSaving.set(true);

    const formData = this.profileForm.value;

    const userData: Partial<User> = {
      fullName: formData.fullName,
      phone: formData.phone || undefined,
      birthday: formData.birthday || undefined,
      address: this.isAddressEmpty(formData.address) ? undefined : formData.address
    };

    console.log('Datos a enviar:', userData);

    // Llamada real al servicio
    this.userService.updateUser(userData).subscribe({
      next: (response) => {
        this.isSaving.set(false);
        console.log('Perfil actualizado:', response);
        this.openSnackBar('Perfil actualizado correctamente!','Cerrar','snackbar-success');

        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.isSaving.set(false);
        console.error('Error al actualizar:', error);

        this.handleUpdateError(error);
      }
    });
  }


  private formatDateForBackend(dateString: string | undefined): string | undefined {
    if (!dateString) return undefined;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return undefined;

      // Convertir de "2020-02-14" a "2020-02-14T00:00:00.000Z"
      return date.toISOString();
    } catch (error) {
      console.error('Error al formatear fecha para backend:', error);
      return undefined;
    }
  }

   handleUpdateError(error: any): void {
    let errorMessage = 'Error al actualizar el perfil';

    // Manejar errores específicos del backend
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 400) {
      errorMessage = 'Datos inválidos. Revisa la información ingresada.';
    } else if (error.status === 401) {
      errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
      this.userService.logOut();
      this.router.navigate(['/login']);
      return;
    } else if (error.status === 0) {
      errorMessage = 'No hay conexión con el servidor.';
    }

     this.openSnackBar(errorMessage, 'Cerrar','snackbar-error');
  }


  cancelEdit() {
    if (this.profileForm.dirty) {
      const confirmed = confirm('¿Estás seguro que deseas cancelar? Se perderán los cambios no guardados.');
      if (!confirmed) return;
    }

    this.router.navigate(['/profile']);
  }

   markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isAddressEmpty(address: any): boolean {
    if (!address) return true;

    const addressFields = ['street', 'city', 'cp', 'location', 'country'];
    return addressFields.every(field => !address[field] || address[field].trim() === '');
  }

    openSnackBar(message: string, action: string, panelClass: string) {
      this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: panelClass
    });
  }

}
