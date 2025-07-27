import { Component, Input } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-cards-list',
  imports: [CharacterCardComponent, PaginationComponent],
  templateUrl: './cards-list.component.html'
})
export class CardsListComponent {

  @Input()
  characters: Character[] = [];

  name : string = 'character';


}
