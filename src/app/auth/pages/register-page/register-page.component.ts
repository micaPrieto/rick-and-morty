import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormUtils } from '../../utils/form.utils';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule ,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  formUtils = FormUtils;

   constructor(
    private fb : FormBuilder,
    private snackBar : MatSnackBar,
    private router : Router,
    private authService: UserService
   ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
     this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.min(5), Validators.max(15)]],
        email: [
          '',
          [
            Validators.required,
            Validators.min(10),
            Validators.max(50),
            Validators.email,
          ],
        ],
        password: [
          '',
          [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
        ],
        street: ['', [/*Validators.required,*/ Validators.maxLength(50)]],
        city: ['', [/*Validators.required,*/ Validators.maxLength(50)]],
        location: ['', [/*Validators.required,*/ Validators.maxLength(50)]],
        country: ['', [/*Validators.required,*/ Validators.maxLength(50)]],
        cp: ['', [/*Validators.required,*/ Validators.minLength(4), Validators.maxLength(4)]],
        phone: ['', [Validators.pattern(this.formUtils.telPattern)]],
        birthday: [''],
      },
      {
        validators: [
          this.formUtils.isFieldOneEquealFieldTwo('password', 'confirmPassword'),
        ],
      }
    );
  }

  onSubmit() {
    this.register()
  }

  register(){
    const user = this.getUserOfForm();
     if (this.isFormValid(user))
    {
      this.authService.register(user).subscribe({
        next: (success) => {
          if (success) {
            console.log(user);

            this.registerForm.reset();
            this.openSnackBar('Cuenta creada con éxito', 'Cerrar','snackbar-success');
            this.router.navigateByUrl('auth/login');
          }
        },
        error: (err) =>{
          const errorMsg = err?.error?.header?.error;

          if (errorMsg === 'Mail already registered') {
            this.openSnackBar('Ya existe una cuenta con ese email.', 'Cerrar','snackbar-error');
          } else {
            this.openSnackBar('Error al registrar usuario. Intente nuevamente.', 'Cerrar','snackbar-error');
          }
        }
      });
    }
  }

  getUserOfForm(): User {
    const formValue = this.registerForm.getRawValue();

    const hasAddress =
      formValue.street?.trim() ||
      formValue.city?.trim() ||
      formValue.location?.trim() ||
      formValue.country?.trim() ||
      formValue.cp?.trim();

    const user: User = {
      fullName: formValue.fullName,
      email: formValue.email,
      password: formValue.password,
      ...(formValue.phone?.trim() ? { phone: formValue.phone } : {}),
      ...(formValue.birthday?.trim() ? { birthday: formValue.birthday } : {}),
      ...(hasAddress ? {
        address: {
          street: formValue.street,
          city: formValue.city,
          location: formValue.location,
          country: formValue.country,
          cp: formValue.cp,
        }
      } : {}),
    };

    return user;
  }

  isFormValid(user: User): boolean{
    let valid = true;
    if (this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      this.openSnackBar('Por favor, completá todos los campos correctamente.', 'Cerrar','snackbar-error');
      valid =  false;
    }
    return valid;
  }

  openSnackBar(message: string, action: string, panelClass: string) {
      this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: panelClass
    });
  }

}
