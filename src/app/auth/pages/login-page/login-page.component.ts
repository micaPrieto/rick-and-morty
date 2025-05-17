import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { Route, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router : Router,
     private snackBar : MatSnackBar,
    ) {}

  loginForm!: FormGroup;
  formUtils = FormUtils;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.getRawValue());
     //const user = this.getUserOfForm();

      if(this.isFormValid(this.loginForm.getRawValue())){
        //this.userService.addUser(user);

        this.loginForm.reset();
        this.openSnackBar('Inicio de sesión exitoso', 'Cerrar');

        this.router.navigateByUrl('characters')
      }

  }

    isFormValid(user: User): boolean{
      let valid = true;
      if (this.loginForm.invalid){
        this.loginForm.markAllAsTouched();
        this.openSnackBar('Por favor, completá todos los campos correctamente.', 'Cerrar');
        valid =  false;
      }
      // else if( this.userService.isEmailExists(user.email)&& user.email ){
      //   this.openSnackBar('Ya existe una cuenta con ese email.', 'Cerrar');
      //   valid = false;
      // }
      return valid;
    }


     openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
       });
     }

}


