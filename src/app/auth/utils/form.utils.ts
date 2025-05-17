import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";


export class FormUtils{

  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'; //Expresion regular


  static isInvaliedField(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.errors && control.touched);
  } //Si tiene errores

  static getFieldError(form: FormGroup,fieldName: string): string | null
  {
    if(!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName]?.errors ?? {};

    return FormUtils.getTextError(errors);
  }


  static getTextError(errors: ValidationErrors){
    // console.log( 'Objet key errors: ', Object.keys(errors));
    for(const key of Object.keys(errors)) {
          switch(key){
            case 'required' :
              return 'Este campo es requerido';

            case 'minlength':
              return `Debe tener un minimo de ${errors['minlength'].requiredLength} caracteres.`

            case 'maxlength':
              return `Debe tener un máximo de ${errors['maxlength'].requiredLength} caracteres.`

            case 'email':
              return `El correo electronico no es válido`
          }
      }
      return null;
  }


  //*Si las CONTRASEÑAS son IGUALES
  static  isFieldOneEquealFieldTwo(field1: string, field2: string){
    return(formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return (field1Value === field2Value) ? null : {passwodsNotEqual: true};
    }
   }


}
