import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translaterCharacterInfo'
})

export class translaterCharacterInfo implements PipeTransform {

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
