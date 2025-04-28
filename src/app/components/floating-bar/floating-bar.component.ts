import { Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-floating-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './floating-bar.component.html'
})
export class FloatingBarComponent {

  charactersService = inject(CharactersService);
  characterSelected = this.charactersService.$characterSelected;

}
