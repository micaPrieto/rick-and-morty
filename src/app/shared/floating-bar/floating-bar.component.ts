import { Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters-service';


@Component({
  selector: 'app-floating-bar',
  imports: [],
  templateUrl: './floating-bar.component.html'
})
export class FloatingBarComponent {

  charactersService = inject(CharactersService);
  actualCharacter = this.charactersService.$characterSelected;

}
