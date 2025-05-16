import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule,MatSnackBarModule ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;


   constructor(
    private fb : FormBuilder,
    private snackBar : MatSnackBar,
   ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(5), Validators.max(15)]],
      mail: [
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
        [Validators.required, Validators.min(8), Validators.max(30)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.min(8), Validators.max(30)],
      ],
      street: ['', [Validators.required, Validators.max(50)]],
      city: ['', [Validators.required, Validators.max(50)]],
      location: ['', [Validators.required, Validators.max(50)]],
      country: ['', [Validators.required, Validators.max(50)]],
      cp: ['', [Validators.required, Validators.min(4), Validators.max(4)]],
    });
  }

  onSubmit() {
    console.log(this.registerForm.getRawValue());

    const user = this.getUserOfForm();
    /*
    if(this.isFormValid(user)){
      this.userService.addUser(user);

      this.registerForm.reset();
      this.openSnackBar('Cuenta creada con éxito', 'Cerrar');

      this.router.navigateByUrl('login')
    }
      */
  }

  getUserOfForm(): User {
    const formValue = this.registerForm.getRawValue();

    const user: User = {
      name: formValue.name,
      mail: formValue.mail,
      password: formValue.password,
      address: {
        street: formValue.street,
        city: formValue.city,
        location: formValue.location,
        country: formValue.country,
        cp: formValue.cp,
      },
    };

    return user;
  }

  isFormValid(user: User): boolean{
    let valid = true;
    if (this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
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
