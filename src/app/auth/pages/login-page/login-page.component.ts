import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { Route, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private snackBar : MatSnackBar,
    private authService : AuthService
    ) {}

  loginForm!: FormGroup;
  formUtils = FormUtils;

  hasError = signal(false)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {

    const {mail= '' ,password = ''} =  this.loginForm.value;
    //Desestructura (extrae) los campos mail y password desde el objeto this.loginForm.value.

      if(this.isFormValid())
      {
        this.authService.login(mail!, password!).subscribe({
          next: (isAuthenticated) => {
              if(isAuthenticated)
              {
                this.router.navigateByUrl('characters')

                this.loginForm.reset();
                this.openSnackBar('Inicio de sesión exitoso', 'Cerrar','snackbar-success');
              }
            },
          error: (err) => {
              const errorMsg = err?.error?.header?.error;

              if (errorMsg === 'User not found' || 'Invalid password' ) {
                this.openSnackBar('Email o contraseña incorrecta', 'Cerrar','snackbar-error');
              } else {
                this.openSnackBar('Error al iniciar sesión. Intenta nuevamente.', 'Cerrar','snackbar-error');
              }

              this.hasError.set(true);
            }
          })
      }
  }

    isFormValid(): boolean{
      let valid = true;
      if (this.loginForm.invalid){
        this.loginForm.markAllAsTouched();
        this.openSnackBar('Por favor, completa correctamente todos los campos correctamente.', 'Cerrar','snackbar-error');
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


