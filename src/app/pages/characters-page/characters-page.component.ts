import { Component, inject, OnInit} from '@angular/core';
import { CharactersService } from '../../services/characters-service';
import {CharacterCardComponent } from "../../components/character-card/character-card.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { FloatingBarComponent } from "../../shared/floating-bar/floating-bar.component";


@Component({
  selector: 'app-characters-page',
  imports: [CharacterCardComponent, PaginationComponent, SearchInputComponent, CharacterCardComponent, FloatingBarComponent],
  templateUrl: './characters-page.component.html'
})
export default class CharactersPageComponent implements OnInit {

  charactersService = inject(CharactersService)

  $characters =this.charactersService.$characters;

  charactersFiltered: any;
  searchTerm: any;


  ngOnInit(): void {
    this.charactersService.getCharacters(1);
  }


}
