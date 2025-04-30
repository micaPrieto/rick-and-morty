import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translaterCharacterInfo'
})

export class translaterCharacterInfo implements PipeTransform {

  //El PipeTransform nos va  apermitir ejecutar este metodo cada vez que
  //se ejecute o cambie la data que estamos asociando al pipe.

  transform(value: string | undefined): string
  {
      const localValue  = value?.toLocaleLowerCase();

      switch (localValue) {
        case 'alive':
          return 'Vivo';
        case 'dead':
          return 'Muerto';
        case 'female':
            return 'Femenino';
        case 'male':
          return 'Masculino';
        case 'genderless':
          return 'Sin género';
        default:
          return 'Desconocido';
      }
  }


}
