import { Component,Input } from '@angular/core';
import { Character } from '../../interfaces/characters/character.interface';
import { RouterLink,RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-card',
  imports: [RouterLink,RouterModule],
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {

  @Input() character!: Character;

}
