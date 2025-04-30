import { Component, inject, OnInit} from '@angular/core';
import { CharactersService } from '../../services/characters-service';
import {CharacterCardComponent } from "../../components/character-list/character-card/character-card.component";
import { SearchInputComponent } from "../../components/character-list/search-input/search-input.component";
import { FloatingBarComponent } from "../../../shared/components/floating-bar/floating-bar.component";
import { PaginationComponent } from '../../components/character-list/pagination/pagination.component';


@Component({
  selector: 'app-characters-list-page',
  imports: [
     CharacterCardComponent,
     PaginationComponent,
     SearchInputComponent,
     FloatingBarComponent
    ],
  templateUrl: './characters-list-page.component.html'
})
export default class CharactersListPageComponent implements OnInit {

  charactersService = inject(CharactersService)
  $characters =this.charactersService.$characters;


  ngOnInit(): void {
    this.charactersService.$characterSelected.set(null);

    this.charactersService.getCharacters(1);
  }


}
