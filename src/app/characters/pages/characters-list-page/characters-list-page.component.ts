import { Component, inject, OnInit} from '@angular/core';
import { CharactersService } from '../../services/characters-service';
import {CharacterCardComponent } from "../../components/character-list/character-card/character-card.component";
import { SearchInputComponent } from "../../components/character-list/search-input/search-input.component";
import { FloatingBarComponent } from "../../../shared/components/floating-bar/floating-bar.component";
import { PaginationComponent } from '../../components/character-list/pagination/pagination.component';
import { Character } from '../../interfaces/character.interface';


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

  characters : Character[] = [];
  isError : any;


  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {

    this.charactersService.characters.subscribe((data) => {
      this.characters = data;
    });

    this.charactersService.isError.subscribe(err => {
      this.isError = err;
    });

    this.charactersService.getCharacters(1);
  }


}
