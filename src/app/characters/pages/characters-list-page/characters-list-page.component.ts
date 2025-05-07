import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CharactersService } from '../../services/characters-service';
import {CharacterCardComponent } from "../../components/character-list/character-card/character-card.component";
import { SearchInputComponent } from "../../components/character-list/search-input/search-input.component";
import { FloatingBarComponent } from "../../../shared/components/floating-bar/floating-bar.component";
import { PaginationComponent } from '../../components/character-list/pagination/pagination.component';
import { Character } from '../../interfaces/character.interface';
import { Subscription } from 'rxjs';


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
export default class CharactersListPageComponent implements OnInit, OnDestroy {

  characters : Character[] = [];
  isError : any;

  sub =new Subscription()

  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {

    this.sub.add(
      this.charactersService.characters.subscribe((data) => {
        this.characters = data;
      })
    );

    this.sub.add(
      this.charactersService.isError.subscribe(err => {
        this.isError = err;
      })
    );

    this.charactersService.getCharacters(1);
  }

  ngOnDestroy(): void  {
    this.sub.unsubscribe();
  }//Angular invoca ngOnDestroy automáticamente
  //cuando el componente se elimina del DOM
  //(por ej, al cambiar de ruta o condicionalmente ocultar el componente).

}
